# AbsenceManager - Gestión de Ausencias

Sistema para registrar días de vacaciones, permisos (flex) y compensatorios de los trabajadores del área de Integraciones.

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
- **Java 17+** (tienes Java 20)
- **Node.js 18+** (tienes Node 22)
- **Maven 3.8+**

## Ejecución

### Backend (Spring Boot)
```bash
cd backend
mvnw spring-boot:run
```
> API disponible en http://localhost:8080/api
> Consola H2: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:file:./data/absencedb)

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
| GET | /api/absences/month?year=2025&month=2 | Por mes |
| GET | /api/absences/summary?year=2025 | Resumen anual |
| POST | /api/absences | Crear ausencia |
| PUT | /api/absences/{id} | Actualizar |
| DELETE | /api/absences/{id} | Eliminar |
