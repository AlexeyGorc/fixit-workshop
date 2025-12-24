<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PriceListItem;
use Illuminate\Http\Request;

class PriceListController extends Controller
{
    public function index(Request $request)
    {
        $q = PriceListItem::query()
            ->with('service:id,name,category,subcategory');

        $q->when($request->filled('service_id'), fn($qq) => $qq->where('service_id', (int)$request->input('service_id')));
        $q->when($request->filled('q'), fn($qq) => $qq->where('description', 'like', '%' . $request->input('q') . '%'));

        $perPage = (int)($request->input('per_page', 200));
        $perPage = max(1, min($perPage, 200));

        return $q->orderByDesc('created_at')->paginate($perPage);
    }
}
