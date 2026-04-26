## installation process for express js with typescript
```
npm init --y
npm i -D typescript
npm i express
tsc --init
```

### create src and dist folder
### create entry point: into the src folder, create an app folder. then into the app folder, create two files named app.ts and server.ts
```
npm i --save-dev @types/express
npm install ts-node-dev --save-dev
```
### add the following in the package.json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}

### change the tsconfig.js file with the following:
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "commonjs",
    "target": "es2019",
    "types": ["node"],
    "esModuleInterop": true,
   
    // Other Outputs
    "sourceMap": true,
    
    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Recommended Options
    "strict": true,

    "skipLibCheck": true,
  }
}
```
npm i mongoose
npm i cors
tsc -w (optional)
```
### npm i validator --->need to check
### install type validator ---> need to check
### npm i zod
### npm i bcryptjs ---> to secure password


