<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $q = Service::query();

        // filters
        $q->when($request->filled('category'), fn($qq) => $qq->where('category', $request->string('category')));
        $q->when($request->filled('subcategory'), fn($qq) => $qq->where('subcategory', $request->string('subcategory')));

        $q->when($request->filled('price_from'), fn($qq) => $qq->where('price', '>=', (float)$request->input('price_from')));
        $q->when($request->filled('price_to'), fn($qq) => $qq->where('price', '<=', (float)$request->input('price_to')));

        $deadlineFrom = $request->input('deadline_from');
        $deadlineTo   = $request->input('deadline_to');

        if ($deadlineFrom !== null || $deadlineTo !== null) {
            $from = $deadlineFrom !== null ? (int)$deadlineFrom : 0;
            $to   = $deadlineTo !== null ? (int)$deadlineTo : PHP_INT_MAX;

            $q->where(function ($w) use ($from, $to) {
                $w->whereNull('min_days')->orWhereNull('max_days')
                    ->orWhere(function ($x) use ($from, $to) {
                        $x->where('min_days', '<=', $to)
                            ->where('max_days', '>=', $from);
                    });
            });
        }

        $sort = $request->input('sort', 'newest');
        $q->when($sort === 'price_asc', fn($qq) => $qq->orderBy('price', 'asc'));
        $q->when($sort === 'price_desc', fn($qq) => $qq->orderBy('price', 'desc'));
        $q->when($sort === 'newest', fn($qq) => $qq->orderBy('created_at', 'desc'));

        $perPage = (int)($request->input('per_page', 12));
        $perPage = max(1, min($perPage, 50));

        return response()->json(
            $q->paginate($perPage)
        );
    }

    // GET /api/services/{service}
    public function show(Service $service)
    {
        $service->load(['projects', 'priceItems']);

        return response()->json($service);
    }

    // GET /api/services/compare?ids=1,2,3
    public function compare(Request $request)
    {
        $idsRaw = (string)$request->query('ids', '');
        $ids = collect(explode(',', $idsRaw))
            ->map(fn($v) => (int)trim($v))
            ->filter(fn($v) => $v > 0)
            ->unique()
            ->take(10)
            ->values();

        if ($ids->isEmpty()) {
            return response()->json([
                'message' => 'Provide ids query param: ?ids=1,2,3'
            ], 422);
        }

        $services = Service::query()
            ->whereIn('id', $ids->all())
            ->with(['priceItems'])
            ->get()
            ->keyBy('id');

        $ordered = $ids->map(fn($id) => $services->get($id))->filter()->values();

        return response()->json([
            'items' => $ordered,
        ]);
    }
}
