// 1. ¿Qué es una ruta absoluta? Proporcione un ejemplo tanto para un sistema de archivos como para una URL
// Ejemplo de sistema de archivos:
// Windows: C:\Users\John\Documents\project\index.html
// Unix/Linux/macOS:/home/john/documents/project/index.html

// Ejemplo de URL:
// https://www.example.com/blog/article.html

// 2. ¿Qué es una ruta relativa? Proporcione un ejemplo de cómo hacer referencia a un archivo ubicado en un directorio hermano.
/*
project/
|--src/
|    |__components/
|       |__header.js
|__public/
     |__images/
        |__logo.png


Para hacer referencia logo.png desde header.js, usarías la ruta relativa:
../..public/images/logo.png

*/

// 3. ¿Qué es una ruta relativa a la raíz? ¿En qué se diferencia de una ruta absoluta?
// Una ruta absoluta incluye la dirección completa (por ejemplo, https://www.example.com/blog/article.html)
// Mientras que una ruta relativa a la raíz comienza desde la raíz del dominio (por ejemplo, /blog/article.html).

/*
4. Dado el siguiente ejemplo de sistema de archivos, suponga que se encuentra en el mathdirectorio. 
¿Cómo se referiría al archivo lab-report.txtutilizando cada uno de los tres tipos de rutas?
(Suponga que esto se encuentra en la unidad C: en Windows o en la raíz en sistemas basados ​​en Unix)

school/
├── math/
│   └─ homework.txt
└── science/
    └─ lab-report.txt

    Ruta absoluta:
Windows: C:\school\science\lab-report.txt
Unix/Linux/macOS:/school/science/lab-report.txt

Ruta relativa:
../science/lab-report.txt

Ruta relativa raíz:
/school/science/lab-report.txt
*/

/*
5. Dado el siguiente contexto de desarrollo web, suponga que su página actual es project.html, 
¿cómo haría referencia a la imagen background.jpg utilizando cada uno de los tres tipos de rutas?
Supongamos que este sitio está alojado en https://www.my-site.com

/
├── index.html
├── about.html
├── assets/
│   ├── images/
│   │   └─ background.jpg
│   └── css/
│       └─ styles.css
└── content/
    └── project.html

Ruta absoluta:
https://www.my-site.com/assets/images/background.jpg

Ruta relativa:
../assets/images/background.jpg

Ruta relativa raíz:
/assets/images/background.jpg   
*/