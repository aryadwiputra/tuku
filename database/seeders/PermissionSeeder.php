<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Dashboard
        Permission::create(['name' => 'dashboard-access']);

        // User Management
        Permission::create(['name' => 'users-access']);
        Permission::create(['name' => 'users-create']);
        Permission::create(['name' => 'users-update']);
        Permission::create(['name' => 'users-destroy']);
        
        // User Profile
        Permission::create(['name' => 'profile-access']);

        // Role Management
        Permission::create(['name' => 'roles-access']);
        Permission::create(['name' => 'roles-create']);
        Permission::create(['name' => 'roles-update']);
        Permission::create(['name' => 'roles-destroy']);
    }
}