<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $q = Project::query()->with('service:id,name,category,subcategory');

        // фильтры
        $q->when($request->filled('service_id'), fn($qq) =>
        $qq->where('service_id', (int) $request->input('service_id'))
        );

        $q->when($request->filled('category'), fn($qq) =>
        $qq->whereHas('service', fn($s) => $s->where('category', $request->input('category')))
        );

        $q->when($request->filled('q'), fn($qq) =>
        $qq->where('name', 'like', '%' . $request->input('q') . '%')
            ->orWhere('description', 'like', '%' . $request->input('q') . '%')
        );

        // limit для главной (без пагинации)
        if ($request->filled('limit')) {
            $limit = max(1, min((int)$request->input('limit'), 24));
            return $q->orderByDesc('created_at')->limit($limit)->get();
        }

        // пагинация для страницы /projects
        $perPage = max(1, min((int)$request->input('per_page', 12), 48));
        return $q->orderByDesc('created_at')->paginate($perPage);
    }
}
