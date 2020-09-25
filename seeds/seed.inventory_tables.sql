BEGIN;

INSERT INTO 
    inventory_tires ( brand, size, quantity, condition)

VALUES 
('Michelin', '2555517', '4', 'new'),
('Bridgestone', '2055516', '1', 'used');

INSERT INTO 
    inventory_wheels ( make, model, car_year, wheel_width, wheel_diameter, bolt_pattern, quantity )
VALUES
  ('Acura', 'TL', '2015', '18', '8', '5X120', '2' ),
  ('BMW', 'M4', '2020', '18', '8', '5X120', '2' );

INSERT INTO inventory_custom_wheels (brand, wheel_width, wheel_diameter, bolt_pattern, quantity)

VALUES
   ('Moto Metal', '20', '9', '5X127', '4'),
   ('Ferrara', '20', '9', '5X127', '4');

COMMIT;

