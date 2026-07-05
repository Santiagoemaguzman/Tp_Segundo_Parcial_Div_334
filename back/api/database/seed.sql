-- ============================================================================
-- CREACION DE LA BASE DE DATOS
-- ============================================================================
CREATE DATABASE IF NOT EXISTS tcgpokeservicedb;

USE tcgpokeservicedb;

-- ============================================================================
-- CREACION DE LAS TABLAS
-- ============================================================================
DROP TABLE IF EXISTS VentasProductos;
DROP TABLE IF EXISTS Ventas;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS TipoProductos;
DROP TABLE IF EXISTS Usuarios;

CREATE TABLE TipoProductos (
    IDTipoProducto INT AUTO_INCREMENT PRIMARY KEY
    , TipoProducto VARCHAR(255) NOT NULL
    , Estado BIT DEFAULT 1
    , UsuarioAlta VARCHAR(100) NOT NULL
    , FechaAlta DATETIME NOT NULL DEFAULT CURRENT_DATE 
    , UsuarioModif VARCHAR(100) NULL DEFAULT NULL
    , FechaModif DATETIME NULL DEFAULT NULL
);

CREATE TABLE Productos (
    IDProducto INT AUTO_INCREMENT PRIMARY KEY
    , Producto VARCHAR(255) NOT NULL
    , IDTipoProducto INT NOT NULL
    , Importe DECIMAL(10, 2) NOT NULL
    , Stock INT NOT NULL DEFAULT 0
    , ImagenPath VARCHAR(255) NOT NULL
    , Estado BIT DEFAULT 1
    , UsuarioAlta VARCHAR(100) NOT NULL
    , FechaAlta DATETIME NOT NULL DEFAULT CURRENT_DATE 
    , UsuarioModif VARCHAR(100) NULL DEFAULT NULL
    , FechaModif DATETIME NULL DEFAULT NULL
    , CONSTRAINT FK_Productos_TipoProductos 
        FOREIGN KEY (IDTipoProducto) REFERENCES TipoProductos(IDTipoProducto)
);

CREATE TABLE Ventas (
    IDVenta INT AUTO_INCREMENT PRIMARY KEY
    , ImporteTotal DECIMAL(10, 2) NOT NULL
    , Cliente VARCHAR(255) NOT NULL
    , Estado BIT DEFAULT 1
    , UsuarioAlta VARCHAR(100) NOT NULL
    , FechaAlta DATETIME NOT NULL DEFAULT CURRENT_DATE 
    , UsuarioModif VARCHAR(100) NULL DEFAULT NULL
    , FechaModif DATETIME NULL DEFAULT NULL
);

CREATE TABLE VentasProductos (
    IDVentasProductos INT AUTO_INCREMENT PRIMARY KEY
    , IDVenta INT NOT NULL
    , IDProducto INT NOT NULL
    , ProductoCantidad INT NOT NULL DEFAULT 1
    , CONSTRAINT FK_VentasProductos_Ventas FOREIGN KEY (IDVenta) REFERENCES Ventas(IDVenta)
    , CONSTRAINT FK_VentasProductos_Productos FOREIGN KEY (IDProducto) REFERENCES Productos(IDProducto)
);

CREATE TABLE ProductosEliminados (
    IDProducto INT 
    , Producto VARCHAR(255) NOT NULL
    , IDTipoProducto INT NOT NULL
    , Importe DECIMAL(10, 2) NOT NULL
    , Stock INT NOT NULL DEFAULT 0
    , ImagenPath VARCHAR(255) NOT NULL
    , Estado BIT DEFAULT 1
    , UsuarioAlta VARCHAR(100) NOT NULL
    , FechaAlta DATETIME NOT NULL DEFAULT CURRENT_DATE 
    , UsuarioModif VARCHAR(100) NULL DEFAULT NULL
    , FechaModif DATETIME NULL DEFAULT NULL
);

CREATE TABLE VentasProductosEliminados (
    IDVentasProductos INT 
    , IDVenta INT NOT NULL
    , IDProducto INT NOT NULL
    , ProductoCantidad INT NOT NULL DEFAULT 1
);



CREATE TABLE Usuarios (
    Mail VARCHAR(255) PRIMARY KEY
    , Password VARCHAR(255) NOT NULL
    , NombreApellido VARCHAR(255) NOT NULL
    , Estado BIT DEFAULT 1
    , UsuarioAlta VARCHAR(100) NOT NULL
    , FechaAlta DATETIME NOT NULL DEFAULT CURRENT_DATE 
    , UsuarioModif VARCHAR(100) NULL DEFAULT NULL
    , FechaModif DATETIME NULL DEFAULT NULL
);

-- ============================================================================
-- INSERTS
-- ============================================================================
INSERT INTO TipoProductos( TipoProducto, UsuarioAlta )
VALUES ( 'Boosters', 'admin'  )
        , ( 'Singles', 'admin'  );

INSERT INTO Usuarios( Mail, Password, NombreApellido, UsuarioAlta )
VALUES (
    'tester@poketcg.com',
    '$2b$10$kI9sV2n0Xl1AGzaQ7LmgGe/.FSzu83bXmpyg.6VBq4MU4b0S4IA7K',
    'Tester PokeTCG',
    'admin'
);

INSERT INTO Productos( Producto, IDTipoProducto, Importe, Stock, ImagenPath, UsuarioAlta )
VALUES ( 'Booster Mega Evolution : Ascended Heroes', 1, 23000.00, 100,  '../../back/productos-imgs/000001.png','admin' )
    , ( 'Booster Mega Evolution : Perfect Order', 1, 12000.00, 100,  '../../back/productos-imgs/000002.png','admin' )
    , ( 'Booster Scarlet & Violet : 151', 1, 70000.00, 100,  '../../back/productos-imgs/000003.png','admin')
    , ( 'Booster Scarlet & Violet : Base Set Version 01', 1, 21600.00, 100, '../../back/productos-imgs/000004.png','admin' )
    , ( 'Booster Scarlet & Violet : Base Set Version 02', 1, 21600.00, 100, '../../back/productos-imgs/000005.png','admin' )
    , ( 'Booster Scarlet & Violet : Destined Rivals', 1, 40000.00, 100, '../../back/productos-imgs/000006.png','admin' )
    , ( 'Arcanine ex (SV1 224/198)', 2, 27850.85, 100, '../../back/productos-imgs/000007.png','admin' )
    , ( 'Banette ex (SV1 088/198)', 2, 3450.55, 100, '../../back/productos-imgs/000008.png','admin' )
    , ( 'Banette ex (SV1 229/198)', 2, 7249.05, 100, '../../back/productos-imgs/000009.png','admin' )
    , ( 'Blastoise ex (MEW 200/165)', 2, 166423.69, 100, '../../back/productos-imgs/000010.png','admin' )
    , ( 'Gardevoir ex (SV1 086/198)', 2, 6872.10, 100, '../../back/productos-imgs/000011.png','admin' )
    , ( 'Houndoom (SFA 066/064)', 2, 82740.66, 100, '../../back/productos-imgs/000012.png','admin' )
    , ( 'Meowth ex (POR 107/088)', 2, 28996.20, 100, '../../back/productos-imgs/000013.png','admin' )
    , ( 'Mewtwo ex (DRI 240/182)', 2, 122900.39, 100, '../../back/productos-imgs/000014.png','admin' )
    , ( 'Psyduck de Misty (DRI 193/182)', 2, 165278.34, 100, '../../back/productos-imgs/000015.png','admin' )
    , ( 'Typhlosion de Eco (DRI 190/182)', 2, 50670.86, 100, '../../back/productos-imgs/000016.png','admin' )
    , ( 'Beedrill ex (DRI 098/086)', 2, 11453.50, 100, '../../back/productos-imgs/000017.png','admin' )
    , ( 'Charizard ex (MEW 183/165)', 2, 71185.67, 100, '../../back/productos-imgs/000018.png','admin' )
    , ( 'Greavard ex (SV1 214/198)', 2, 32620.72, 100, '../../back/productos-imgs/000019.png','admin' )
    , ( 'MegaStarmie ex (POR 102/088)', 2, 15527.47, 100, '../../back/productos-imgs/000020.png','admin' )
    , ( 'Mew ex (MEW 151/165)', 2, 26415.54, 100, '../../back/productos-imgs/000021.png','admin' )
    , ( 'Pachirisu (SV1 208/198)', 2, 46103.96, 100, '../../back/productos-imgs/000022.png','admin' )
    , ( 'Tauros (CRI 096/086)', 2, 8321.91, 100, '../../back/productos-imgs/000023.png','admin');
