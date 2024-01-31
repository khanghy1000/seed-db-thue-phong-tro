import {faker} from "@faker-js/faker";
import {prisma} from "../seed";

export const seedPhong = async () => {
    const chuPhong = await prisma.chu_phong.findMany();
    const phuongXa = await prisma.phuong_xa.findMany();

    const result = Array.from(Array(70)).map((_) => {
        return {
            ten_phong: faker.lorem.words(2),
            so_nha: faker.location.streetAddress(),
            ma_phuong_xa:
            phuongXa[Math.floor(Math.random() * phuongXa.length)]
                .ma_phuong_xa,
            so_luong_nguoi: Math.floor(Math.random() * 9) + 1,
            dien_tich_phong: Math.floor(Math.random() * 300) + 20,
            gia_thue: Math.floor(Math.random() * 20_000_000) + 500_000,
            mo_ta_them: faker.lorem.words(100),
            ma_chu_phong:
            chuPhong[Math.floor(Math.random() * chuPhong.length)]
                .ma_chu_phong,
        };
    });

    await prisma.phong.createMany({data: result});
};