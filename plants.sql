DROP TABLE IF EXISTS colors;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS info;
DROP TABLE IF EXISTS imgProperties;
DROP TABLE IF EXISTS plants;

CREATE TABLE plants(
id SERIAL PRIMARY KEY ,
plant_type VARCHAR (200) NOT NULL,
name VARCHAR (200) NOT NULL  UNIQUE CHECK (name<>''),
polinator BOOLEAN,
size VARCHAR (200) NOT NULL,
img TEXT,
description TEXT,
months VARCHAR (200),
age VARCHAR (200),
hardy BOOLEAN,
sunny  BOOLEAN,
partial_shade  BOOLEAN,
shade  BOOLEAN
);

CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    plant_name VARCHAR (200) NOT NULL  REFERENCES plants(name),
    red BOOLEAN DEFAULT false,
    white BOOLEAN  DEFAULT false,
    green BOOLEAN  DEFAULT false,
    yellow BOOLEAN  DEFAULT false,
    pink BOOLEAN DEFAULT false,
    blue BOOLEAN DEFAULT false,
    purple BOOLEAN DEFAULT false
);

CREATE TABLE location(
    id SERIAL PRIMARY KEY,
    plant_name VARCHAR (200) NOT NULL  REFERENCES plants(name),
    sunny   BOOLEAN DEFAULT false,
    shade  BOOLEAN DEFAULT false,
    partial_shade  BOOLEAN DEFAULT false
);

CREATE TABLE imgProperties(
    id  SERIAL PRIMARY KEY,
    plant_name VARCHAR (200) NOT NULL  REFERENCES plants(name),
    by VARCHAR (200) NOT NULL ,
    class VARCHAR (200),
    license VARCHAR (500) NOT NULL,
    link TEXT
);

INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade ) VALUES (
    'flower',
    'Snapdragon',
    'true',
    'small',
    '/Snapdragons.jpg',
    'an easy plant which will flower all summer',
    'may to october',
    'annual',
    'false',
    'true',
    'true',
    'false'
);

INSERT INTO colors (plant_name, red, white, yellow, pink) VALUES(
    (SELECT name FROM plants WHERE name='Snapdragon'),
    'true',
    'true',
    'true',
    'true'
);

INSERT INTO location (plant_name, sunny, partial_shade) VALUES (
        (SELECT name FROM plants WHERE name='Snapdragon'),
    'true',
    'true'
);

INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
        (SELECT name FROM plants WHERE name='Snapdragon'),
    'I, MichaD',
    'CC BY-SA 2.5',
    'https://commons.wikimedia.org/w/index.php?curid=2429233'
);


INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'flower',
    'Tulips',
    'false',
    'small',
    '/Tulip.jpg',
    'an early flower, save the buds after flowering and replant in autom for new flowers next year',
    'april to may',
    'perennial',
    'false',
    'true',
    'true',
    'false'
);

INSERT INTO colors (plant_name, red, white, yellow, pink) VALUES(
    (SELECT name FROM plants WHERE name='Tulips'),
    'true',
    'true',
    'true',
    'true'
);

INSERT INTO location (plant_name, sunny, partial_shade) VALUES (
        (SELECT name FROM plants WHERE name='Tulips'),
    'true',
    'true'
);
INSERT INTO imgProperties (plant_name, by, class, license, link ) VALUES(
        (SELECT name FROM plants WHERE name='Tulips'),
    'UsMontanabw',
    'Own work',
    'Creative Commons Attribution-Share Alike 4.0',
    'https://commons.wikimedia.org/w/index.php?curid=58628976'
);

INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'vegetable',
    'Tomatoes',
    'true',
    'medium-large',
    '/Tomaten.jpg',
    'choose a small type, which will give you sweet fruits',
    'july to august',
    'annual',
    'false',
    'true',
    'false',
    'false'
);

INSERT INTO colors (plant_name, green) VALUES(
    (SELECT name FROM plants WHERE name='Tomatoes'),
    'true'
);

INSERT INTO location (plant_name, sunny) VALUES (
        (SELECT name FROM plants WHERE name='Tomatoes'),
    'true'
);

INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'herb',
    'Basil',
    'true',
    'small-medium',
    '/Basil.jpg',
    'Just put a plant from the supermerket into a larger container. Basil attracts bees only when the plant carries flowers.',
    'june to october',
    'annual',
    'false',
    'true',
    'true',
    'false'
);

INSERT INTO colors (plant_name, green) VALUES(
    (SELECT name FROM plants WHERE name='Basil'),
    'true'
);

INSERT INTO location (plant_name, sunny, partial_shade) VALUES (
        (SELECT name FROM plants WHERE name='Basil'),
    'true',
    'true'
);

INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
        (SELECT name FROM plants WHERE name='Basil'),
    'Risacher',
    'CC BY-SA 3.0',
    'https://commons.wikimedia.org/w/index.php?curid=1189407'
);
INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'herb',
    'Lavender',
    'true',
    'medium',
    '/Lavender.jpg',
    'Plant in a well drained container and cut back one third of its height after flower and  in spring to promote more growth ',
    'july to september',
    'perennial',
    'true',
    'true',
    'false',
    'false'
);

INSERT INTO colors (plant_name, purple) VALUES(
    (SELECT name FROM plants WHERE name='Lavender'),
    'true'
);

INSERT INTO location (plant_name, sunny) VALUES (
        (SELECT name FROM plants WHERE name='Lavender'),
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
        (SELECT name FROM plants WHERE name='Lavender'),
    'Irene Grassi',
    'CC BY-SA 2.0',
    'https://commons.wikimedia.org/w/index.php?curid=71212663'
);


INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'herb',
    'Catnip',
    'true',
    'medium',
    '/Catnip.jpg',
    'Plant in a well drained container, preferably not with other plants, as catnip spreads out.',
    'may to october',
    'perennial',
    'true',
    'true',
    'false',
    'false'
);

INSERT INTO colors (plant_name, green, white) VALUES(
    (SELECT name FROM plants WHERE name='Catnip'),
    'true',
    'true'
);

INSERT INTO location (plant_name, sunny) VALUES (
        (SELECT name FROM plants WHERE name='Catnip'),
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
        (SELECT name FROM plants WHERE name='Catnip'),
    'KENPEI',
    'CC BY-SA 3.0',
    'https://commons.wikimedia.org/w/index.php?curid=2439230'
);


INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'herb',
    'Mint',
    'true',
    'medium',
    '/Mint.jpg',
    'Do not plant in the same container as other plants, as mint spreads out.',
    'may to september',
    'perennial',
    'true',
    'true',
    'true',
    'false'
);

INSERT INTO colors (plant_name, green, white) VALUES(
    (SELECT name FROM plants WHERE name='Mint'),
    'true',
    'true'
);

INSERT INTO location (plant_name, partial_shade, sunny) VALUES (
    (SELECT name FROM plants WHERE name='Mint'),
    'true',
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
        (SELECT name FROM plants WHERE name='Mint'),
    'No machine-readable author provided',
    'CC BY-SA 2.5',
    'https://commons.wikimedia.org/w/index.php?curid=338932'
);
INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'herb',
    'Chives',
    'true',
    'small-medium',
    '/Chives.jpg',
    'The flowers are also edible.',
    'april to september',
    'perennial',
    'true',
    'true',
    'true',
    'false'
);

INSERT INTO colors (plant_name, green, purple) VALUES(
    (SELECT name FROM plants WHERE name='Chives'),
    'true',
    'true'
);

INSERT INTO location (plant_name, partial_shade, sunny) VALUES (
    (SELECT name FROM plants WHERE name='Chives'),
    'true',
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
    (SELECT name FROM plants WHERE name='Chives'),
    'Jean-Jacques MILAN at French Wikipedia',
    'CC BY-SA 3.0',
    'https://commons.wikimedia.org/w/index.php?curid=2206077'
);

INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'flower',
    'Sander''s tobacco',
    'true',
    'small-medium',
    '/Nicotina.jpg',
    'Do not let the soil dry out completely',
    'may to october',
    'annual',
    'false',
    'true',
    'false',
    'false'
);

INSERT INTO colors (plant_name, purple, white, red) VALUES(
    (SELECT name FROM plants WHERE name='Sander''s tobacco'),
    'true',
    'true',
    'true'
);

INSERT INTO location (plant_name, sunny) VALUES (
    (SELECT name FROM plants WHERE name='Sander''s tobacco'),
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
    (SELECT name FROM plants WHERE name='Sander''s tobacco'),
    'Wuhazet (Henryk Żychowski)',
    'CC BY 3.0',
    'https://commons.wikimedia.org/w/index.php?curid=15370191'
);
INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'flower',
    'Coneflower',
    'true',
    'medium-large',
    '/Solhatt.jpg',
    'Do not let the soil dry out completely. Cut of flowers after flowering.',
    'july to september',
    'perennial',
    'true',
    'true',
    'true',
    'false'
);

INSERT INTO colors (plant_name, purple, pink, yellow) VALUES(
    (SELECT name FROM plants WHERE name='Coneflower'),
    'true',
    'true',
    'true'
);

INSERT INTO location (plant_name, sunny, partial_shade) VALUES (
    (SELECT name FROM plants WHERE name='Coneflower'),
    'true',
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
    (SELECT name FROM plants WHERE name='Coneflower'),
    'Diego Delso',
    'CC BY-SA 3.0',
    'https://commons.wikimedia.org/w/index.php?curid=30273528'
);

INSERT INTO plants(plant_type, name, polinator, size, img, description, months, age, hardy, sunny,
partial_shade,
shade) VALUES (
    'flower',
    'Hydrangea',
    'false',
    'medium',
    '/Hydrangea.jpg',
    'Cover in winter',
    'may to september',
    'perennial',
    'true',
    'false',
    'true',
    'true'
);

INSERT INTO colors (plant_name, purple, blue, white) VALUES(
    (SELECT name FROM plants WHERE name='Hydrangea'),
    'true',
    'true',
    'true'
);

INSERT INTO location (plant_name, partial_shade, shade) VALUES (
    (SELECT name FROM plants WHERE name='Hydrangea'),
    'true',
    'true'
);
INSERT INTO imgProperties (plant_name, by, license, link ) VALUES(
    (SELECT name FROM plants WHERE name='Hydrangea'),
    'unknown',
    'CC BY-SA 3.0',
    'https://commons.wikimedia.org/w/index.php?curid=121795'
);
