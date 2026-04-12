# AbsenceManager - Gestión de Ausencias

Sistema para registrar días de vacaciones, permisos (flex) y compensatorios de los trabajadores de un área.

## Tipos de Ausencia
| Código | Descripción |
|--------|-------------|
| **F** | Flex / Permiso |
| **V** | Vacaciones |
| **VT** | Vacaciones Tomadas |
| **C** | Compensatorio |

## Estructura del Proyecto
```
app-AbsenceManager/
├── frontend/          # Angular 16 (TypeScript)
│   └── src/app/
│       ├── core/          # Modelos, servicios, interceptors, guards
│       ├── features/      # Dashboard, Empleados, Ausencias, Calendario
│       └── environments/  # Configuración por ambiente
├── backend/           # Spring Boot 3.2 (Java)
│   └── src/main/java/com/absencemanager/
│       ├── model/         # Entidades JPA
│       ├── repository/    # Repositorios Spring Data
│       ├── service/       # Lógica de negocio
│       ├── controller/    # API REST
│       ├── dto/           # Data Transfer Objects
│       ├── config/        # CORS
│       └── exception/     # Manejo global de errores
```

## Requisitos
- **Java 17+**
- **Node.js 18+**
- **Maven 3.8+**
- **MySQL 5.7+** (XAMPP o similar)

## Ejecución

### Base de Datos
Crear la base de datos en MySQL:
```sql
CREATE DATABASE IF NOT EXISTS absence_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Backend (Spring Boot)
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
> API disponible en http://localhost:8080/api

### Frontend (Angular)
```bash
cd frontend
npm start
```
> App disponible en http://localhost:4200

## API Endpoints

### Empleados
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/employees | Listar empleados activos |
| GET | /api/employees/{id} | Obtener empleado |
| POST | /api/employees | Crear empleado |
| PUT | /api/employees/{id} | Actualizar empleado |
| DELETE | /api/employees/{id} | Desactivar empleado |

### Ausencias
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/absences | Listar todas |
| GET | /api/absences/employee/{id} | Por empleado |
| GET | /api/absences/month?year=2026&month=2 | Por mes |
| GET | /api/absences/summary?year=2026 | Resumen anual |
| POST | /api/absences | Crear ausencia |
| PUT | /api/absences/{id} | Actualizar |
| DELETE | /api/absences/{id} | Eliminar |

## Autor
© 2026 Luis Alberto Forero Guzman
