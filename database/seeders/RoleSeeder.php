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
        Permission::create(['name' => 'gestionusuarios'])->syncRoles([$role, $role2]); //solo lo pueda ver los admins

        Permission::create(['name' => 'gestionusuarios.create'])->syncRoles([$role, $role2]);
        Permission::create(['name' => 'gestionusuarios.update'])->syncRoles([$role, $role2]);
        Permission::create(['name' => 'gestionusuarios.delete'])->syncRoles([$role, $role2]);

        /* PERMISO PARA PROFESORES */
        Permission::create(['name' => 'panelprofesor']); //solo para que lo puedan ver los profesores

        Permission::create(['name' => 'panelprofesor.create'])->syncRoles([$role, $role2]);
        Permission::create(['name' => 'panelprofesor.update'])->syncRoles([$role, $role2]);
        Permission::create(['name' => 'panelprofesor.delete'])->syncRoles([$role, $role2]);
    }
}
