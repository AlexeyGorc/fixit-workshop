<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $limit = (int)$request->query('limit', 5);
        $limit = max(1, min($limit, 50));

        return News::query()
            ->orderByDesc('published_at')
            ->limit($limit)
            ->get(['id', 'title', 'body', 'published_at']);
    }
}
