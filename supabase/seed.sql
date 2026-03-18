-- =============================================
-- INSOLIT - Seed Data
-- Run this after schema.sql
-- =============================================

-- Merchants
INSERT INTO merchants (id, name, logo_url, address) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Burger Palace', NULL, '12 Rue de Rivoli, 75001 Paris'),
  ('a2222222-2222-2222-2222-222222222222', 'EscapeGame Paris', NULL, '45 Boulevard Saint-Germain, 75005 Paris'),
  ('a3333333-3333-3333-3333-333333333333', 'StreetWear Co.', NULL, '8 Rue Oberkampf, 75011 Paris'),
  ('a4444444-4444-4444-4444-444444444444', 'TechDeal', NULL, '102 Avenue des Champs-Élysées, 75008 Paris'),
  ('a5555555-5555-5555-5555-555555555555', 'GlowUp Studio', NULL, '23 Rue du Faubourg Saint-Honoré, 75008 Paris'),
  ('a6666666-6666-6666-6666-666666666666', 'FitZone', NULL, '67 Rue de la Roquette, 75011 Paris'),
  ('a7777777-7777-7777-7777-777777777777', 'Ciné Paradis', NULL, '15 Rue des Écoles, 75005 Paris'),
  ('a8888888-8888-8888-8888-888888888888', 'Sushi Master', NULL, '33 Rue Sainte-Anne, 75001 Paris');

-- Promos
INSERT INTO promos (title, description, category, promo_code, discount_value, is_exclusive, valid_until, latitude, longitude, merchant_id) VALUES
  (
    'Menu Smash Burger à -40%',
    'Profite d''un menu complet avec burger smash, frites maison et boisson pour seulement 6,90€ au lieu de 11,50€. Offre valable en semaine uniquement.',
    'Food',
    'SMASH40',
    40,
    true,
    '2026-06-30',
    48.8566,
    2.3522,
    'a1111111-1111-1111-1111-111111111111'
  ),
  (
    'Escape Game : 1 place achetée = 1 offerte',
    'Vis une aventure immersive avec tes potes ! Pour toute place achetée, la deuxième est offerte. Plus de 10 scénarios disponibles.',
    'Expérience',
    'ESCAPE2X1',
    50,
    true,
    '2026-05-15',
    48.8530,
    2.3499,
    'a2222222-2222-2222-2222-222222222222'
  ),
  (
    '-30% sur toute la collection été',
    'Renouvelle ta garde-robe avec la nouvelle collection streetwear. Hoodies, tees, sneakers... tout y passe.',
    'Mode',
    'STREET30',
    30,
    false,
    '2026-07-31',
    48.8650,
    2.3780,
    'a3333333-3333-3333-3333-333333333333'
  ),
  (
    'AirPods Pro à prix cassé',
    'Les AirPods Pro 2 à -25% grâce à notre partenariat exclusif. Stock limité, premier arrivé premier servi !',
    'Tech',
    'TECHPODS25',
    25,
    true,
    '2026-04-30',
    48.8698,
    2.3075,
    'a4444444-4444-4444-4444-444444444444'
  ),
  (
    'Soin visage complet offert',
    'Découvre un soin du visage professionnel de 45 minutes. Nettoyage, gommage et masque inclus. Sur rendez-vous.',
    'Beauté',
    'GLOW100',
    100,
    false,
    '2026-05-31',
    48.8704,
    2.3152,
    'a5555555-5555-5555-5555-555555555555'
  ),
  (
    'Abonnement salle de sport à 9,99€/mois',
    '3 mois d''accès illimité à toutes les machines, cours collectifs et sauna. Sans engagement.',
    'Sport',
    'FIT999',
    60,
    true,
    '2026-06-15',
    48.8564,
    2.3784,
    'a6666666-6666-6666-6666-666666666666'
  ),
  (
    'Place de ciné à 4€',
    'Tous les mardis et jeudis, ta place de cinéma à 4€ au lieu de 12€. Valable pour tous les films à l''affiche.',
    'Culture',
    'CINE4',
    66,
    false,
    '2026-12-31',
    48.8491,
    2.3448,
    'a7777777-7777-7777-7777-777777777777'
  ),
  (
    'Plateau sushi all-you-can-eat à -35%',
    'Sushis, makis, sashimis en illimité pour 15€ au lieu de 23€. Le midi du lundi au vendredi.',
    'Food',
    'SUSHI35',
    35,
    false,
    '2026-08-31',
    48.8659,
    2.3384,
    'a8888888-8888-8888-8888-888888888888'
  ),
  (
    'Cours de poterie découverte',
    'Initie-toi à la poterie avec un atelier de 2h en petit groupe. Réduc exclusive INSOLIT de 50%.',
    'Expérience',
    'POTE50',
    50,
    true,
    '2026-09-30',
    48.8610,
    2.3499,
    NULL
  ),
  (
    'Box surprise mode streetwear',
    'Reçois une box de 3 pièces streetwear surprise (valeur > 80€) pour seulement 29,99€.',
    'Mode',
    'BOX30',
    30,
    true,
    '2026-07-15',
    NULL,
    NULL,
    'a3333333-3333-3333-3333-333333333333'
  );
