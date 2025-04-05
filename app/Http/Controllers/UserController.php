<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createAlumno(Request $request)
    {
        
        $user = new User();
        $user -> name = $request ->input('name');
        $user -> email = $request ->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->email_verified_at = $request->input('email_verified_at');
        $user -> estado = $request ->input('estado');
        $user->assignRole(3); // Asigna el rol correctamente
        $user->save();
        return response()->json($user, 201);
    }

    public function createProfesor(Request $request)
    {
        $user = new User();
        $user -> name = $request ->input('name');
        $user -> email = $request ->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->email_verified_at = $request->input('email_verified_at');
        $user -> estado = $request ->input('estado');
        $role = Role::where('name', 'profesor')->first();
        $user->assignRole(2); // Asigna el rol correctamente
        $user->save();
        return response()->json($user, 201);
    }

    public function createAdmin(Request $request)
    {
        $user = new User();
        $user -> name = $request ->input('name');
        $user -> email = $request ->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->email_verified_at = $request->input('email_verified_at');
        $user -> estado = $request ->input('estado');
        $user->assignRole(1); // Asigna el rol correctamente
        $user->save();
        return response()->json($user, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        User::destroy($request->input('id'));
        return response()->json(null, 204);
    }

    public function buscarAlumno($nombre)
    {
        $alumnos = User::where('name', 'LIKE', "%{$nombre}%")
        ->whereExists(function ($query) {
            $query->select(DB::raw(1))
                  ->from('model_has_roles')
                  ->whereColumn('model_id', 'users.id')
                  ->where('role_id', 3);
        })
        ->get();

    return response()->json($alumnos, 200);
    }

    public function buscarProfesor($nombre)
    {
        $profesores = User::where('name', 'LIKE', "%{$nombre}%")
        ->whereExists(function ($query) {
            $query->select(DB::raw(1))
                  ->from('model_has_roles')
                  ->whereColumn('model_id', 'users.id')
                  ->where('role_id', 2);
        })
        ->get();

        return response()->json($profesores, 200);
    }

    public function buscarAdmin($nombre)
    {
        $administradores = User::where('name', 'LIKE', "%{$nombre}%")
        ->whereExists(function ($query) {
            $query->select(DB::raw(1))
                  ->from('model_has_roles')
                  ->whereColumn('model_id', 'users.id')
                  ->where('role_id', 1);
        })
        ->get();

        return response()->json($administradores, 200);
    }

    public function estado($id)
    {
        $user = User::findOrFail($id);
        if ($user->estado == true) {
            $user->estado= false;
            $user->email_verified_at=null;
        }
        else{
            $user->estado= true;
            $user->email_verified_at=now();
        }
        $user->save();
        
        return response()->json($user);
    }
}
