/* Seeds for users and listings. Resets to these values when 'npm run db:reset' is run */

INSERT INTO users (name, username, password, address, email, phone_number)
VALUES ('Bob', 'bob123', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
        '123 Sesame Street', 'bob@lighthouse.ca', '6041234567'),
        ('Michael Green', 'michaelgreen', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
        '4688 Victoria Park Ave, Toronto ON', 'michael@lighthouse.ca', '6042146455'),
        ('Jimmy Zhang', 'jimmyzhang', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
        '4561 No. 3 Road, Richmond BC', 'jimmy@lighthouse.ca', '4166153580'),
        ('Kirsten Hammond', 'kirstenhammond', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
        '557 5th Avenue, Hythe AB', 'kirsten@lighthouse.ca', '7803560378'),
        ('Peter Griffin', 'petergriffin', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
        '3651 Gorham Street, London ON', 'peter@lighthouse.ca', '5196614060' ),
        ('Cleveland Brown', 'clevelandbrown', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
        '644 Central Pkwy, Port Credit ON', 'cleveland@lighthouse.ca', '9052745999');

INSERT INTO listings (user_id, name, description, price, photo_url, size, gender, condition, listing_date, sold_date, isSold)
VALUES
(1, 'Air Jordan 1 Blue Moon', 'Sz 12. Og box.', 300, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/PJz2ugNrQx28qykcwwFH',
'12', 'Men', 'Gently Used', CURRENT_TIMESTAMP, null, false),
(1, 'Air Jordan 1 Phantom Black Lows', 'DS. Slight factory glue stains. See photo.', 700, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/ltOb1NUR21k41kc9TKRA',
'8', 'Men', 'New', CURRENT_TIMESTAMP, null, false),
(2, 'Nike Dunk Low Panda', 'Size 9.5. No noticable flaws, minor creasing.', 157, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/I3Y9v5s8TgOEx5GWg94d',
'9.5', 'Men', 'Gently Used', CURRENT_TIMESTAMP, null, false),
(2, 'Nike SB Dunk Low Ishod Wair', '2016 Nike Skateboarding. Can be cleaned more, no box. Steal!', 350, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/S1bktGjQQ2P2yU9oN2AB',
'9.5', 'Men', 'Used', CURRENT_TIMESTAMP, null, false),
(3, 'Air Jordan 1 Travis Scott Low Mocha', 'Brand new, OG everything. 3 additional pairs of laces, comes with box.', 999, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:2500,width:1875/output=quality:90/compress/xJrEArrUTW2Y62E39uji',
12, 'Men', 'New', CURRENT_TIMESTAMP, null, false),
(3, 'Air Yeezy 1 Zen Grey', 'Near DS, no og box. Recent midsole swap done, 100% wearable.', 1800, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/UijXHXHQXKzrxN3ix1XL',
9, 'Men', 'Used', CURRENT_TIMESTAMP, null, false),
(4, 'Air Jordan 1 Shadow', 'In great condition, no box.', 261, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/bwyWA8jQmH5EVpSPnGAG',
'12', 'Men', 'Gently Used', CURRENT_TIMESTAMP, null, false),
(4, 'Air Jordan 1 Lost and Found', 'Brand new. Message me for any questions', 600, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/HyPbUGbTy2NN3TGhI2uM',
'10', 'Men', 'New', CURRENT_TIMESTAMP, null, false),
(5, 'Air Jordan 4 White Cement', 'No box, clean pair. Final sale.', 250, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/o6Fii0a5RHu53rcmM22K',
'8.5', 'Men', 'Gently Used', CURRENT_TIMESTAMP, null, false),
(6, 'Louis Vuitton Trainer', 'Size UK7, fits US 8.5. Retail was $1290, condition is 9/10.', 786, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/6n0w2sWVSZeDrdLgE5NW',
'8.5', 'Men', 'Gently Used', CURRENT_TIMESTAMP, null, false);
