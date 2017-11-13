INSERT INTO required_files (id, val, active)
VALUES 
(1, 'Documento word/pdf', 1),
(2, 'Presentacion', 1),
(3, 'Poster', 1),
(4, 'Comprobante pago',1);

ALTER TABLE files ADD requirement INT NOT NULL AFTER project_id;

ALTER TABLE files
ADD FOREIGN KEY (requirement) REFERENCES required_files(id);