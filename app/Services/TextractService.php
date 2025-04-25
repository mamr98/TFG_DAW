<?php

namespace App\Services;

use Aws\Textract\TextractClient;
use Illuminate\Support\Facades\Storage;

class TextractService
{
    protected $client;

    public function __construct()
    {
        $this->client = new TextractClient([
            'version' => '2018-06-27',
            'region' => env('AWS_DEFAULT_REGION')
        ]);
    }

    public function analyzeTable($filePath)
    {
        $fileContent = Storage::get($filePath);
        
        $result = $this->client->analyzeDocument([
            'Document' => ['Bytes' => $fileContent],
            'FeatureTypes' => ['TABLES']
        ]);

        return $this->parseTable($result);
    }

    protected function parseTable($textractResponse)
    {
        $tableData = [];
        $cells = [];

        // Extraer todas las celdas primero
        foreach ($textractResponse['Blocks'] as $block) {
            if ($block['BlockType'] === 'CELL') {
                $cells[$block['Id']] = [
                    'text' => $this->getCellText($block, $textractResponse),
                    'row_index' => $block['RowIndex'],
                    'col_index' => $block['ColumnIndex']
                ];
            }
        }

        // Organizar por filas y columnas
        foreach ($cells as $cell) {
            $rowLetter = chr(64 + $cell['row_index']); // 1 -> A, 2 -> B, etc.
            $colNumber = $cell['col_index'];
            
            if (!isset($tableData[$rowLetter])) {
                $tableData[$rowLetter] = [];
            }
            
            $tableData[$rowLetter][$colNumber] = trim($cell['text']) === '' ? null : 'X';
        }

        return $tableData;
    }

    protected function getCellText($cellBlock, $response)
    {
        $text = '';
        if (isset($cellBlock['Relationships'])) {
            foreach ($cellBlock['Relationships'] as $relationship) {
                if ($relationship['Type'] === 'CHILD') {
                    foreach ($relationship['Ids'] as $id) {
                        foreach ($response['Blocks'] as $block) {
                            if ($block['Id'] === $id && $block['BlockType'] === 'WORD') {
                                $text .= $block['Text'] . ' ';
                            }
                        }
                    }
                }
            }
        }
        return trim($text);
    }
}