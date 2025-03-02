## Introduzione

EasyClinic è un piccolo gestionale per tracciare la storia delle visite di ogni paziente.

## Setup

- Il sito è online all'url https://easy-clinic-five.vercel.app/.

In caso si volesse ricostruire localmente il progetto nella repository è incluso un file "queries.txt" che contiene istruzioni per ricreare il database localmente, e per connettersi sarà sufficiente inserire la connection string dentro appsettings.json.

La connection string avrà questo aspetto (SQL Server Default Instance): "Data Source=YOURCOMPUTERNAME;Initial Catalog=EasyClinicLocal;Integrated Security=True;TrustServerCertificate=True"

## Tech stack

EasyClinic API è una Web API che utilizza l'ambiente .NET Core e strutturata seguendo le idee della Clean Architecture, ed è divisa in Data Access Layer, Application Layer e User Interface Layer.
Alcune librerie di supporto all'API sono:

- Dapper - Micro-ORM per l'accesso ai dati
- FluentMigrator - Supporto alle migrazioni di dati con Dapper
- FluentValidator - Validazione dei modelli lato server
- MSSQL

La User Interface di EasyClinic è stata creata usando React.js + Typescript e utilizza alcune librerie comuni come:

- React-router: Routing lato client e gestione delle chiamate API al caricamento delle pagine
- date-fns: Helper per la gestione delle date
- React-Quill: Rich Text Editor
- classnames: Helper per le classi HTML
- Bootstrap: Framework CSS
