# Desafío técnico para Dux Software

Consiste en la creación de un página donde se permitan las siguientes acciones:
- Mostrar los usuarios de la base de datos en una tabla con estas columnas: id, nombre, estado, sector.
- Crear usuarios.
- Modificar usuarios existentes.
- Eliminar usuarios.
- Buscar usuarios por id / nombre.
- Filtrar usuarios por estado / sector.


## Características y funcionalidades
- Página principal SSR, con carga de datos desde el servidor.
- Implementación de funcionalidades de `DataTable` de PrimeReact: `paginator && filters`.
- Validación de datos ingresados en inputs para evitar inyección de código malicioso.
- Uso de React Context para evitar prop drilling entre componentes.
- Al crear usuarios:
    - Se valida que el id ingresado no exista en la base de datos. Si existe, no se deja proseguir.
    - Si bien esto está implementado así por requerimientos, la creación del id debería ser responsabilidad del backend con algún creador de ids únicos.
    - No se valida que el nombre sea único, ya que parece ser contraintuitivo. Puede haber dos usuarios con el mismo nombre (no así, con el mismo id, que debería ser el identificador)
- Al editar usuarios:
    - No se permite modificar el id (debe ser un dato inmutable)
    - No se permiten caracteres especiales en el nombre.
- Tanto en creación como en edición, no se permite avanzar si alguno de los 4 campos no están completos y se explicita visualmente cuál de los campos resta completar.
- Cuando el id ingresado no es válido porque ya existe, se muestra un message para indicar al usuario esa situación.
- Al terminar cualquiera de las 3 acciones posibles, se muestra un message indicando al usuario que la acción se realizó con éxito.
- Además, al terminar cualquiera de las 3 acciones, la tabla se actualiza para mostrar los usuarios actualizados.


## Un vistazo a su diseño

### Página principal
![Captura de pantalla de 2025-06-24 14-51-16](https://github.com/user-attachments/assets/f0747316-ab67-4399-b4eb-45cf2c5dd03f)

### Crear usuario
![Captura de pantalla de 2025-06-24 14-52-08](https://github.com/user-attachments/assets/6fdbf9f7-6823-43bf-959d-4f6beac1d034)

### Editar usuario
![Captura de pantalla de 2025-06-24 14-52-32](https://github.com/user-attachments/assets/cc869353-936a-498d-8a5e-e61149ea4b81)

### Eliminar usuario
![Captura de pantalla de 2025-06-24 14-52-56](https://github.com/user-attachments/assets/a9b4298d-187e-46d2-b8ec-261f03fc6ed1)

