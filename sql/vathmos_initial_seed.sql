DELETE FROM subject_module;
DELETE FROM subject;
DELETE FROM module_degree_program;
DELETE FROM core_module;
DELETE FROM degree_program;
DELETE FROM module_type;
DELETE FROM role;

INSERT INTO role (id, appRoleId, name) VALUES (1, '77ca2e45-398c-402e-bd63-c8d0ae2aa51e', 'Student');
INSERT INTO role (id, appRoleId, name) VALUES (2, '6077d010-0aae-4139-8f3c-dcee7ecbb1c9', 'Dozent');
INSERT INTO role (id, appRoleId, name) VALUES (3, '66d7ddfb-4156-4c5c-9315-196b63c10ceb', 'Kurs-Administrator');
INSERT INTO role (id, appRoleId, name) VALUES (4, '1e691fa3-6294-4e72-b722-d80b47dc04e1', 'Fachbereichsleiter');

INSERT INTO module_type VALUE (1,"E");
INSERT INTO module_type VALUE (2,"M");
INSERT INTO module_type VALUE (3,"D");
INSERT INTO module_type VALUE (4,"F");

/*INSERT INTO degree_program_program_part VALUE (1,"Vertiefung Automation 23");
INSERT INTO degree_program_program_part VALUE (2,"Grundstudium 23");
INSERT INTO degree_program_program_part VALUE (3,"Fachstudium Systemtechnik 23");*/

INSERT INTO degree_program VALUE (1,'{"de":"Elektrotechnik HF"}',"VZ",'{"de":"Automation"}',NULL);

# @TODO Zwischentabelle für grundstudium, fachstudium, vertiefung

INSERT INTO core_module(id, name, module_type_id) VALUES (1, '{"de":"Naturwissenschaftliche Grundlagen / Konstruktion I"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (2, '{"de":"Betriebs- und Organisationstechnik I"}', 3);
INSERT INTO core_module(id, name, module_type_id) VALUES (3, '{"de":"Mechatronik / Informatik I"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (4, '{"de":"Mathematik"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (5, '{"de":"Persönlichkeitsentwicklung"}', 1);
INSERT INTO core_module(id, name, module_type_id) VALUES (6, '{"de":"Betriebs- und Organisationstechnik II & Mechatronik II"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (7, '{"de":"Systemtechnik Grundlagen"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (8, '{"de":"Informatik II"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (9, '{"de":"Informatik III"}', 2);
INSERT INTO core_module(id, name, module_type_id) VALUES (10, '{"de":"Transfer"}', 4);
INSERT INTO core_module(id, name, module_type_id) VALUES (11, '{"de":"Diplomarbeit"}', 3);

INSERT INTO module_degree_program VALUE (1, 1);
INSERT INTO module_degree_program VALUE (1, 2);
INSERT INTO module_degree_program VALUE (1, 3);
INSERT INTO module_degree_program VALUE (1, 4);
INSERT INTO module_degree_program VALUE (1, 5);
INSERT INTO module_degree_program VALUE (1, 6);
INSERT INTO module_degree_program VALUE (1, 7);
INSERT INTO module_degree_program VALUE (1, 8);
INSERT INTO module_degree_program VALUE (1, 9);
INSERT INTO module_degree_program VALUE (1, 10);
INSERT INTO module_degree_program VALUE (1, 11);

INSERT INTO subject(id, name, shortName) VALUES (1, '{"de":"Produktionsverfahren Grundlagen"}', 'A1B221.3a');
INSERT INTO subject(id, name, shortName) VALUES (2, '{"de":"CAD Einführung"}', 'B2C321.3a');
INSERT INTO subject(id, name, shortName) VALUES (3, '{"de":"Statik/Reibungslehre Grundlagen"}', 'C3D421.3a');
INSERT INTO subject(id, name, shortName) VALUES (4, '{"de":"Dynamik"}', 'D4E521.3a');
INSERT INTO subject(id, name, shortName) VALUES (5, '{"de":"Systems Engineering"}', 'E5F621.3a');
INSERT INTO subject(id, name, shortName) VALUES (6, '{"de":"Fachprojekt Systemtechnik"}', 'F6G721.3a');
INSERT INTO subject(id, name, shortName) VALUES (7, '{"de":"Betriebswirtschaftslehre"}', 'G7H821.3a');
INSERT INTO subject(id, name, shortName) VALUES (8, '{"de":"Betriebsorganisation"}', 'H8I921.3a');
INSERT INTO subject(id, name, shortName) VALUES (9, '{"de":"Projektmanagement"}', 'I9J021.3a');
INSERT INTO subject(id, name, shortName) VALUES (10, '{"de":"Unternehmenslogistik"}', 'J0K121.3a');
INSERT INTO subject(id, name, shortName) VALUES (11, '{"de":"Deutsch-Information"}', 'K1L221.3a');
INSERT INTO subject(id, name, shortName) VALUES (12, '{"de":"Elektrotechnik Grundlagen"}', 'L2M321.3a');
INSERT INTO subject(id, name, shortName) VALUES (13, '{"de":"Elektro-CAD"}', 'M3N421.3a');
INSERT INTO subject(id, name, shortName) VALUES (14, '{"de":"Digitaltechnik"}', 'N4O521.3a');
INSERT INTO subject(id, name, shortName) VALUES (15, '{"de":"SPS-Programmierung Grundlagen"}', 'O5P621.3a');
INSERT INTO subject(id, name, shortName) VALUES (16, '{"de":"Antriebstechnik Grundlagen"}', 'P6Q721.3a');
INSERT INTO subject(id, name, shortName) VALUES (17, '{"de":"Windows/Office"}', 'Q7R821.3a');
INSERT INTO subject(id, name, shortName) VALUES (18, '{"de":"Programmierung Einführung"}', 'R8S921.3a');
INSERT INTO subject(id, name, shortName) VALUES (19, '{"de":"Mathematik: Geometrie"}', 'S9T021.3a');
INSERT INTO subject(id, name, shortName) VALUES (20, '{"de":"Mathematik: Arithmetik"}', 'T0U121.3a');
INSERT INTO subject(id, name, shortName) VALUES (21, '{"de":"Mathematik: Algebra"}', 'U1V221.3a');
INSERT INTO subject(id, name, shortName) VALUES (22, '{"de":"Starttag / Ready for Takeoff"}', 'V2W321.3a');
INSERT INTO subject(id, name, shortName) VALUES (23, '{"de":"PC Installation/Administration"}', 'W3X421.3a');
INSERT INTO subject(id, name, shortName) VALUES (24, '{"de":"Mitarbeiterführung"}', 'X4Y521.3a');
INSERT INTO subject(id, name, shortName) VALUES (25, '{"de":"Lerntechnik und Selbstorganisation"}', 'Y5Z621.3a');
INSERT INTO subject(id, name, shortName) VALUES (26, '{"de":"Wirkungsvoll präsentieren"}', 'Z6A721.3a');
INSERT INTO subject(id, name, shortName) VALUES (27, '{"de":"Kommunikationstraining"}', 'A7B821.3a');
INSERT INTO subject(id, name, shortName) VALUES (28, '{"de":"Produktionsplanung"}', 'B8C921.3a');
INSERT INTO subject(id, name, shortName) VALUES (29, '{"de":"Betriebliche Informationssysteme"}', 'C9D021.3a');
INSERT INTO subject(id, name, shortName) VALUES (30, '{"de":"Finanz- und Rechnungswesen"}', 'D0E121.3a');
INSERT INTO subject(id, name, shortName) VALUES (31, '{"de":"Qualitätsmanagement I"}', 'E1F221.3a');
INSERT INTO subject(id, name, shortName) VALUES (32, '{"de":"Persönlicher Auftritt"}', 'F2G321.3a');
INSERT INTO subject(id, name, shortName) VALUES (33, '{"de":"Ergonomie und Sicherheit"}', 'G3H421.3a');
INSERT INTO subject(id, name, shortName) VALUES (34, '{"de":"Antriebstechnik Umsetzung"}', 'H4I521.3a');
INSERT INTO subject(id, name, shortName) VALUES (35, '{"de":"Elektronik Grundlagen"}', 'I5J621.3a');
INSERT INTO subject(id, name, shortName) VALUES (36, '{"de":"Industrielle Kommunikationssysteme"}', 'J6K721.3a');
INSERT INTO subject(id, name, shortName) VALUES (37, '{"de":"Objektbasierte Programmierung"}', 'K7L821.3a');
INSERT INTO subject(id, name, shortName) VALUES (38, '{"de":"Regelungstechnik"}', 'L8M921.3a');
INSERT INTO subject(id, name, shortName) VALUES (39, '{"de":"Robotik"}', 'M9N021.3a');
INSERT INTO subject(id, name, shortName) VALUES (40, '{"de":"SPS-Programmierung mit ST"}', 'N0O121.3a');
INSERT INTO subject(id, name, shortName) VALUES (41, '{"de":"Netzwerk/Internet-Technologien"}', 'O1P221.3a');
INSERT INTO subject(id, name, shortName) VALUES (42, '{"de":"SPS Datenanbindung"}', 'P2Q321.3a');
INSERT INTO subject(id, name, shortName) VALUES (43, '{"de":"Software Engineering"}', 'Q3R421.3a');
INSERT INTO subject(id, name, shortName) VALUES (44, '{"de":"System Management"}', 'R4S521.3a');
INSERT INTO subject(id, name, shortName) VALUES (45, '{"de":"Objektorientiertes Programmieren"}', 'S5T621.3a');
INSERT INTO subject(id, name, shortName) VALUES (46, '{"de":"Algorithmen / Datenstrukturen"}', 'T6U721.3a');
INSERT INTO subject(id, name, shortName) VALUES (47, '{"de":"Client Web-Technologies"}', 'U7V821.3a');
INSERT INTO subject(id, name, shortName) VALUES (48, '{"de":"Databinding / Webservices"}', 'V8W921.3a');
INSERT INTO subject(id, name, shortName) VALUES (49, '{"de":"System Access / Libraries"}', 'W9X021.3a');
INSERT INTO subject(id, name, shortName) VALUES (50, '{"de":"Server Web-Technologies / Database"}', 'X0Y121.3a');
INSERT INTO subject(id, name, shortName) VALUES (51, '{"de":"Projektorientiertes Engineering (PoE)"}', 'Y1Z221.3a');
INSERT INTO subject(id, name, shortName) VALUES (52, '{"de":"Prozessmodul"}', 'Z2A321.3a');
INSERT INTO subject(id, name, shortName) VALUES (53, '{"de":"Problembearbeitung"}', 'A3B421.3a');
INSERT INTO subject(id, name, shortName) VALUES (54, '{"de":"Problemlösung"}', 'B4C521.3a');
INSERT INTO subject(id, name, shortName) VALUES (55, '{"de":"Bericht und Präsentation"}', 'C5D621.3a');

INSERT INTO subject_module (module_id, subject_id) VALUES (1, 1);
INSERT INTO subject_module (module_id, subject_id) VALUES (1, 2);
INSERT INTO subject_module (module_id, subject_id) VALUES (1, 3);
INSERT INTO subject_module (module_id, subject_id) VALUES (1, 4);
INSERT INTO subject_module (module_id, subject_id) VALUES (2, 7);
INSERT INTO subject_module (module_id, subject_id) VALUES (2, 8);
INSERT INTO subject_module (module_id, subject_id) VALUES (2, 9);
INSERT INTO subject_module (module_id, subject_id) VALUES (2, 10);
INSERT INTO subject_module (module_id, subject_id) VALUES (2, 11);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 12);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 13);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 14);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 15);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 16);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 17);
INSERT INTO subject_module (module_id, subject_id) VALUES (3, 18);
INSERT INTO subject_module (module_id, subject_id) VALUES (4, 19);
INSERT INTO subject_module (module_id, subject_id) VALUES (4, 20);
INSERT INTO subject_module (module_id, subject_id) VALUES (4, 21);
INSERT INTO subject_module (module_id, subject_id) VALUES (5, 22);
INSERT INTO subject_module (module_id, subject_id) VALUES (5, 23);
INSERT INTO subject_module (module_id, subject_id) VALUES (5, 24);
INSERT INTO subject_module (module_id, subject_id) VALUES (5, 25);
INSERT INTO subject_module (module_id, subject_id) VALUES (5, 26);
INSERT INTO subject_module (module_id, subject_id) VALUES (5, 27);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 28);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 29);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 30);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 31);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 32);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 33);
INSERT INTO subject_module (module_id, subject_id) VALUES (6, 34);
INSERT INTO subject_module (module_id, subject_id) VALUES (7, 35);
INSERT INTO subject_module (module_id, subject_id) VALUES (7, 36);
INSERT INTO subject_module (module_id, subject_id) VALUES (7, 37);
INSERT INTO subject_module (module_id, subject_id) VALUES (7, 38);
INSERT INTO subject_module (module_id, subject_id) VALUES (7, 39);
INSERT INTO subject_module (module_id, subject_id) VALUES (8, 40);
INSERT INTO subject_module (module_id, subject_id) VALUES (8, 41);
INSERT INTO subject_module (module_id, subject_id) VALUES (8, 42);
INSERT INTO subject_module (module_id, subject_id) VALUES (8, 43);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 44);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 45);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 46);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 47);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 48);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 49);
INSERT INTO subject_module (module_id, subject_id) VALUES (9, 50);
INSERT INTO subject_module (module_id, subject_id) VALUES (10, 51);
INSERT INTO subject_module (module_id, subject_id) VALUES (10, 52);
INSERT INTO subject_module (module_id, subject_id) VALUES (11, 53);
INSERT INTO subject_module (module_id, subject_id) VALUES (11, 54);
INSERT INTO subject_module (module_id, subject_id) VALUES (11, 55);

--
-- Daten für Tabelle `exam`
--
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (1, 'Verteilte Systeme Test 1', '40%', 43);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (2, 'Verteilte Systeme Test 2', '40%', 43);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (3, 'Verteilte Systeme Test 3', '20%', 43);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (4, 'Präsentation', '100%', 32);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (5, 'Algebra Test 1', '50%', 21);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (6, 'Word Test 1', '25%', 17);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (7, 'Word Test 2', '25%', 17);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (8, 'Excel Test 1', '25%', 17);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (9, 'Algebra Test 2', '50%', 21);
INSERT INTO `exam` (`id`, `name`, `weighting`, `subject_id`) VALUES (10, 'PowerPoint Test 1', '25%', 17);