<?php

namespace App\Http\Controllers\Aws;

use App\Http\Controllers\Controller;
use Aws\Textract\TextractClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;

class TextractController extends Controller
{
    protected $textractClient;

    public function __construct()
    {
        $this->textractClient = new TextractClient([
            'version' => '2018-06-27',
            'region' => env('AWS_DEFAULT_REGION', 'eu-west-3'),
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);
    }

    public function analyzeImageFromUrl(Request $request)
    {
        $request->validate(['image_url' => 'required|url']);

        try {
            $imageContent = file_get_contents($request->image_url);
            
            if (!$imageContent) {
                throw new \Exception("No se pudo descargar la imagen desde la URL proporcionada");
            }

            $result = $this->textractClient->analyzeDocument([
                'Document' => ['Bytes' => $imageContent],
                'FeatureTypes' => ['TABLES', 'FORMS'],
            ]);

            $processedData = $this->processTextractResponse($result->toArray());

            return response()->json([
                'success' => true,
                'extracted_data' => $processedData,
                'full_response' => config('app.debug') ? $result->toArray() : null
            ]);

        } catch (\Exception $e) {
            Log::error("Error en Textract: " . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function processTextractResponse(array $textractData): array
    {
        $simplified = [
            'tipo' => 'examen_test',
            'total_preguntas' => 0,
            'respuestas_correctas' => [],
            'estructura' => []
        ];

        $blocks = new Collection($textractData['Blocks']);

        // Buscar la tabla principal
        $table = $blocks->firstWhere('BlockType', 'TABLE');
        if (!$table) {
            return $simplified;
        }

        // Obtener todas las celdas de la tabla
        $cells = $blocks->filter(fn ($block) => $block['BlockType'] === 'CELL');

        // Organizar celdas por filas y columnas
        $tableStructure = [];
        foreach ($cells as $cell) {
            $row = $cell['RowIndex'];
            $col = $cell['ColumnIndex'];
            
            if (!isset($tableStructure[$row])) {
                $tableStructure[$row] = [];
            }
            
            $tableStructure[$row][$col] = [
                'text' => $this->extractCellText($cell, $blocks),
                'is_selected' => $this->isCellSelected($cell, $blocks)
            ];
        }

        // Procesar la estructura de la tabla
        if (!empty($tableStructure)) {
            // La primera fila son los números de pregunta
            $headerRow = reset($tableStructure);
            $simplified['total_preguntas'] = count($headerRow) - 1;
            
            // Las siguientes filas son las opciones (A, B, C, D)
            foreach ($tableStructure as $rowIndex => $row) {
                if ($rowIndex == 1) continue; // Saltar la fila de encabezado
                
                $optionLetter = $row[1]['text'] ?? '';
                
                foreach ($row as $colIndex => $cell) {
                    if ($colIndex == 1) continue; // Saltar la columna de letras
                    
                    $questionNumber = $headerRow[$colIndex]['text'] ?? null;
                    if (is_numeric($questionNumber)) {
                        if ($cell['is_selected']) {
                            $simplified['respuestas_correctas'][(int)$questionNumber] = $optionLetter;
                        }
                        
                        $simplified['estructura'][] = [
                            'pregunta' => (int)$questionNumber,
                            'opcion' => $optionLetter,
                            'seleccionada' => $cell['is_selected']
                        ];
                    }
                }
            }
            
            // Ordenar respuestas por número de pregunta
            ksort($simplified['respuestas_correctas']);
        }

        return $simplified;
    }

    protected function extractCellText(array $cell, Collection $blocks): string
    {
        $text = '';
        if (isset($cell['Relationships'])) {
            foreach ($cell['Relationships'] as $rel) {
                if ($rel['Type'] === 'CHILD') {
                    foreach ($rel['Ids'] as $id) {
                        $block = $blocks->firstWhere('Id', $id);
                        if ($block && $block['BlockType'] === 'WORD') {
                            $text .= $block['Text'] . ' ';
                        }
                    }
                }
            }
        }
        return trim($text);
    }

    protected function isCellSelected(array $cell, Collection $blocks): bool
    {
        if (!isset($cell['Relationships'])) return false;
        
        foreach ($cell['Relationships'] as $rel) {
            if ($rel['Type'] === 'CHILD') {
                foreach ($rel['Ids'] as $id) {
                    $block = $blocks->firstWhere('Id', $id);
                    if ($block && $block['BlockType'] === 'SELECTION_ELEMENT') {
                        return $block['SelectionStatus'] === 'SELECTED';
                    }
                }
            }
        }
        return false;
    }
}