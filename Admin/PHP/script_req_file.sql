INSERT INTO required_files (val, active)
VALUES 
('Documento word/pdf', 1),
('Presentacion', 1),
('Poster', 1),
('Comprobante pago',1);

ALTER TABLE files ADD requirement INT NOT NULL AFTER project_id;

ALTER TABLE files
ADD FOREIGN KEY (requirement) REFERENCES required_files(id);