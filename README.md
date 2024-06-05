# Multi-tenant Architecture

Setup Database-Per-Tenant Connection for Multi-Tenant Application

# Central Database (CMD DB)
Central Management: The central database manages credentials and login information for all tenants.
Secure Access: Only the master user/connection has access to the central database. Tenants do not have access, ensuring data isolation.

# Tenant Onboarding
Database Creation: When a new tenant (company) is onboarded, a new database is created using the master database connection.
Credential Storage: The new database's username, password, and details are stored in the central database's tenants table.

# Connection Pooling
Efficient Request Handling: A connection pool is used to manage requests, enabling multiple queries to be processed simultaneously. This prevents heavy queries from blocking others.

# Dynamic Pool Management:
When a pool request is made, the system checks if the pool for the given tenant ID exists in the map.
If it exists, the pool is used.
If not, a new pool is created, added to the map, and then used.

# Adding Employees
API Access: New employees can access APIs with their login credentials.
Tenant-Specific Operations:
When a user from tenant A adds a new employee, they use the create employee API and pass their tenant ID in the headers.
Middleware fetches the tenant ID, retrieves the corresponding pool from the map, and uses a connection from that pool to add the employee to the correct database.

# Security Layer
Credential Encryption: When onboarding a new tenant, their username and password are encrypted using Node.js's built-in crypto module.
Methods such as crypto.createCipheriv and crypto.createDecipheriv are used for encryption and decryption.
API Key: An API key is created to aid in the encryption and decryption process.
Database Permissions: Once a new pool is created, the user is granted permission to access all tables in their database.

# End-to-End Architecture Summary

Central Database: Manages all tenants' credentials and access.
Connection Pools: Efficiently handle multiple requests in parallel.
Security: Ensures credentials are securely encrypted.
Isolation: Guarantees each tenant's data is isolated and secure from others.

This architecture ensures robust multi-tenancy, secure credential management, efficient request processing, and strict data isolation.
