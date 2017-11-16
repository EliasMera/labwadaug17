CREATE TABLE Teachers (
	id INT NOT NULL AUTO_INCREMENT,
	teacherId VARCHAR(10) NOT NULL, /* número de nómmina (usada para logear)*/ 
	name VARCHAR(50) NOT NULL,
	passwrd VARCHAR(50) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (teacherid)
);

CREATE TABLE Groups (
	id INT NOT NULL AUTO_INCREMENT,
	groupNumber INT NOT NULL,
	courseKey VARCHAR(8),
	teacher_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (teacher_id)
        REFERENCES Teachers(id)
        ON DELETE CASCADE
);

CREATE TABLE Projects (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	company VARCHAR(50) NOT NULL,
	description VARCHAR(600) NOT NULL,
	classification VARCHAR(50) NOT NULL,
	business VARCHAR(200) NOT NULL, /* esto es giro */
	semester VARCHAR(5) NOT NULL,
	recomended BOOLEAN,
	rank INT,
	active BOOLEAN NOT NULL DEFAULT 1,
	participant BOOLEAN DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE Students (
	id INT NOT NULL AUTO_INCREMENT,
	studentId VARCHAR(10) NOT NULL,
	name VARCHAR(50) NOT NULL,
    bachelor VARCHAR(8) NOT NULL,
    passwrd VARCHAR(50) NOT NULL,
    academicEmail VARCHAR(30) NOT NULL,
    personalEmail VARCHAR(30) NOT NULL,
    cellphone VARCHAR(20),
    group_id INT NOT NULL, 
    project_id INT,
    PRIMARY KEY (id),
    UNIQUE (studentId),
    FOREIGN KEY (group_id)
        REFERENCES Groups(id)
        ON DELETE CASCADE,
    FOREIGN KEY (project_id)
        REFERENCES Projects(id)
        ON DELETE CASCADE
);

CREATE TABLE Administrador (
	adminId VARCHAR(10) NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	passwrd VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL
);

CREATE TABLE Project_Feedback (
	id INT NOT NULL AUTO_INCREMENT,
	project_id INT NOT NULL,
	comment VARCHAR(150) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (project_id)
		REFERENCES Projects(id)
		ON DELETE CASCADE,
	UNIQUE (project_id)
);

CREATE TABLE Required_Files (
	id INT NOT NULL,
	val VARCHAR(30) NOT NULL,
	active BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Files (
	id INT NOT NULL AUTO_INCREMENT,
	filePath VARCHAR(100) NOT NULL,
	uploadDate DATETIME NOT NULL,
	project_id INT NOT NULL,
	requirement INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (project_id)
		REFERENCES Projects(id)
		ON DELETE CASCADE,
	FOREIGN KEY (requirement)
		REFERENCES Required_Files(id)
);

CREATE TABLE Project_Classifications (
	id INT NOT NULL AUTO_INCREMENT,
	val VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Anouncements (
	id INT NOT NULL AUTO_INCREMENT,
	val VARCHAR(150), NOT NULL,
	date_time DATETIME,
	PRIMARY KEY (id)
);

INSERT INTO Anouncements (val, date_time) VALUES 
('Primer anuncio del semestre, sean bienvenidos.', now()),
('El respeto al derecho ajeno es la paz. - Benito Juárez', now()),
('La tarea es para mañana señores.', now());

INSERT INTO Project_Classifications (val)
VALUES ("ABONOS Y FERTILIZANTES"), ("ACEITES Y GRASAS VEGETALES"),
("ALUMINIO"), ("AUTOMOTRIZ"), ("AZÚCAR"), ("BIENES DE CAPITAL Y METALMECÁNICA"),
("CARNES FRÍAS Y EMBUTIDOS"), ("CONSERVAS ALIMENTICIAS"), ("CONSTRUCCIÓN"),
("CONSULTORÍA"), ("CRISTALERÍA"), ("CUERO Y CALZADO"), ("DULCES Y CHOCOLATES"),
("ELECTRODOMÉSTICOS"), ("ELECTRÓNICA Y COMUNICACIONES"), ("EQUIPO MÉDICO Y PARAMÉDICO"),
("FARMACÉUTICA"), ("FIBRAS-TEXTIL-VESTIDO"), ("FORESTAL-CELULOSA-PAPEL-EDITORIAL-IMPRENTA"),
("HARINA DE TRIGO, PAN, GALLETAS Y PASTAS"), ("HARINA-MASA Y TORTILLA"), ("HULE"),
("INDUSTRIA NAVAL"), ("JABONES, DETERGENTES Y COSMÉTICOS"), ("JOYERÍA"),
("JUGUETES Y ARTÍCULOS DEPORTIVOS"), ("LECHE Y DERIVADOS LÁCTEOS"), ("MALTA-CERVEZA"),
("MANUFACTURAS ELÉCTRICAS"), ("MINERALES METÁLICOS"), ("MUEBLES Y PRODUCTOS DE MADERA"),
("PETROQUÍMICA"), ("PLÁSTICOS"), ("PRODUCTOS DE CERÁMICA"), ("QUÍMICA INORGÁNICA BÁSICA"),
("REFRESCOS"), ("SIDERURGIA"), ("TEQUILA"), ("TRANSPORTE MARÍTIMO"), ("VIDRIO");

INSERT INTO required_files (id, val, active)
VALUES 
(1, 'Documento word/pdf', 1),
(2, 'Presentacion', 1),
(3, 'Poster', 1),
(4, 'Comprobante pago',1);

INSERT INTO Projects (name, company, description, classification, business, semester, active)
VALUES ("Museo Interactivo A Day in the Future", "A Day in the Future",
'El museo interactivo “A Day in the Future” pretenderá atender la necesidad y el problema de falta de educación en México de manera que incentive a los niños y jóvenes a relacionarse en áreas con tendencias globales y que los adultos tengan una apreciación de éstas. El museo, con un diseño arquitectónico futurista, operará específicamente en Monterrey y su área metropolitana dentro del sector educativo y de recreación pues en éste se expondrán tendencias y futuros desarrollos en áreas como la biotecnología, medicina, biomedicina, mecatrónica, aeroespacial, nanotecnología y ciencias ambientales. Contará con espacios al aire libre, 1 área de comidas y 7 salas temáticas y especializadas para cada área mencionada, las cuales estarán equipadas con material didáctico y vanguardista. Para cada sala habrá un video introductorio del tema, una línea del tiempo, personal capacitado, exposiciones interactivas para todas las edades y diferentes talleres con horarios para niños y jóvenes. Esto con el propósito de educar de forma divertida y atractiva a niños, jóvenes y adultos sobre lo que se espera para el futuro.',
"EDUCACIÓN", "Empresa que busca educar a las futuras generaciones de forma interactiva y actualizada, 
enfoque en las áreas del conocimiento más relevantes para el futuro.", "EM-15", 1),
('YACANA - TOURS Y tú, ¿a dónde quieres ir hoy?', 'YACANA - TOURS',
'Yakana Tours es una empresa dedicada a ofrecer tours personalizados en autobús en la ciudad de Monterrey y la zona metropolitana, de modo que la empresa se adapta a las necesidades de horario y e intereses del cliente. Una segunda y tercera etapa de crecimiento consisten en desarrollar una aplicación que permita conocer información del servicio, calendario de eventos, reservaciones y pagos en línea, así como ofrecer un servicio de tours predefinidos que circulen continuamente en un horario y días específicos.',
"TRANSPORTE", 'Empresa dedicada al giro de los servicios, ofreciendo tours en autobús para los usuarios que deseen conocer Monterrey y sus alrededores, con el fin de promover el turismo, la cultura y las principales atracciones turísticas en la ciudad.', "EM-15", 1),
('AUT JACK', 'AUT JACK', 'En esta empresa se elabora el gato eléctrico para tratar de solventar las necesidades de un segmento de la población el cual batallaba mucho cuando necesitaban cambiar los neumáticos del automóvil.',
'AUTOMOTRIZ', 'Industrial', 'EM-15', 1),
('SMART BUS', 'TECNO BUS', 'SmartBus es un producto que promueve la eficiencia del transporte público',
'ELECTRÓNICA Y COMUNICACIONES', 'Industrial', 'EM-15', 1),
('Kanan', 'Pimapan-Tibb', 'Desarrollo de productos de detección de infecciones de transmisión sexual innovadores con un bajo costo y un alto grado de confiabilidad, capas de realizarse en cualquier lugar',
'EQUIPO MÉDICO Y PARAMÉDICO', 'Industrial manofacturera y Comercial', 'AD-15', 1),
('Guantes electrónicos para TKD', 'Tae Tech',
'Guantes de taekwondo con un sistema de puntuación electrónico para taekwondoines que compiten en las diversas justas deportivas que se organizan a nivel local, nacional e internacional. La idea es atender tanto al mercado de comisiones y organizaciones de taekwondo, así como a los pequeños gimnasios y entrenadores que desarrollan a los atletas que compiten en estas competencias.',
'DEPORTIVO Y ELECTRÓNICO', 'Industrial', 'AD-15', 1),
('Comprando Ando', 'Emprendiendo Andamos',
'Una aplicación móvil llamada “Comprando Ando” que funciona como extensión de los escaparates de las tiendas de un centro comercial para hacer llegar publicidad de sus productos y descuentos a las manos de presuntos consumidores en un tiempo estratégico',
'ELECTRÓNICA Y COMUNICACIONES', 'Servicios', 'AD-15', 1),
('AAA', 'aaa', 'aaa a aaaaa aaaaa aaaa aaaaa aaaaa aaaa aaaaa', 'EDUCACIÓN', 'aaaaa', 'AD-17', 1),
('BBB', 'bbb', 'bbb b bbbbb bbbbb bbbb bbbbb bbbbb bbbb bbbbb', 'EDUCACIÓN', 'bbbbb', 'AD-17', 1),
('CCC', 'ccc', 'ccc c ccccc ccccc cccc ccccc ccccc cccc cccca', 'EDUCACIÓN', 'ccccc', 'AD-17', 1),
('DDD', 'ddd', 'ddd d ddddd ddddd dddd ddddd ddddd dddd ddddd', 'EDUCACIÓN', 'ddddd', 'AD-16', 0),
('EEE', 'eee', 'eee e eeeee eeeee eeee eeeee eeeee eeee eeeee', 'EDUCACIÓN', 'eeeea', 'AD-16', 0),
('FFF', 'fff', 'fff f fffff fffff ffff fffff fffff ffff fffff', 'EDUCACIÓN', 'fffff', 'AD-15', 0),
('AGG', 'ggg', 'ggg g ggggg ggggg gggg ggggg ggggg gggg ggggg', 'EDUCACIÓN', 'ggggg', 'AD-16', 0),
('HHH', 'hhh', 'hhh h hhhhh hhhhh hhhh hhhhh hhhhh hhhh hhhhh', 'EDUCACIÓN', 'hhhhh', 'AD-16', 0),
('III', 'Iii', 'iii i iiiii iiiii iiii iiiii iiiii iiii iiiii', 'EDUCACIÓN', 'iiiii', 'AD-16', 0),
('JJJ', 'jjj', 'jjj j jjjjj jjjjj jjjj jjjjj jjjjj jjjj jjjjj', 'EDUCACIÓN', 'jjjjj', 'AD-16', 0),
('KKK', 'kkk', 'kkk k kkkkk kkkkk kkkk kkkkk kkkkk kkkk kkkkk', 'EDUCACIÓN', 'kkkkk', 'AD-16', 0);


INSERT INTO Students (name, studentId, bachelor, passwrd, academicEmail, personalEmail, cellphone, group_id) VALUES
("Persona Alumno 1", 'A00000001', 'ABC', 'ivan54', 'emailAcademico1', 'emailPersonal1', '000000001', 31),
("Persona Alumno 2", 'A00000002', 'ABC', 'ivan54', 'emailAcademico2', 'emailPersonal2', '000000002', 31),
("Persona Alumno 3", 'A00000003', 'ABC', 'ivan54', 'emailAcademico3', 'emailPersonal3', '000000003', 30),
("Persona Alumno 4", 'A00000004', 'ABC', 'ivan54', 'emailAcademico4', 'emailPersonal4', '000000004', 30),
("Persona Alumno 5", 'A00000005', 'ABC', 'ivan54', 'emailAcademico5', 'emailPersonal5', '000000005', 30),
("Persona Alumno 6", 'A00000006', 'ABC', 'ivan54', 'emailAcademico6', 'emailPersonal6', '000000006', 28),
("Persona Alumno 7", 'A00000007', 'ABC', 'ivan54', 'emailAcademico7', 'emailPersonal7', '000000007', 20),
("Persona Alumno 8", 'A00000008', 'ABC', 'ivan54', 'emailAcademico8', 'emailPersonal8', '000000008', 22),
("Persona Alumno 9", 'A00000009', 'ABC', 'ivan54', 'emailAcademico9', 'emailPersonal9', '000000009', 22);


