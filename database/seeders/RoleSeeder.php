<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'admin']);
        $role2 = Role::create(['name' => 'profesor']);
        $role3 = Role::create(['name' => 'alumno']);

        /* PERMISO PARA ADMINISTRADORES */
        Permission::create(['name' => 'permisoadmin'])->syncRoles([$role]); //solo lo pueda ver los admins

        /* PERMISO PARA PROFESORES */
        Permission::create(['name' => 'permisoprofesor'])->syncRoles([$role]); //solo para que lo puedan ver los profesores

        Permission::create(['name' => 'sinpermiso'])->syncRoles([$role3]);
    }
}
