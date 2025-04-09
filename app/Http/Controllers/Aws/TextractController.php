<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TextractService;
use Illuminate\Support\Facades\Storage;

class TextractController extends Controller
{
    public function process(Request $request, TextractService $textract)
    {
        $request->validate(['file' => 'required|file|mimes:png,jpg,jpeg,pdf']);

        $path = $request->file('file')->store('textract-temp');
        
        try {
            $tableData = $textract->analyzeTable($path);
            Storage::delete($path);
            
            return response()->json([
                'success' => true,
                'data' => $tableData
            ]);
            
        } catch (\Exception $e) {
            Storage::delete($path);
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}