import {faker} from "@faker-js/faker";
import {prisma} from "../seed";

export const seedPhuongXa = async () => {
    const quanHuyen = await prisma.quan_huyen.findMany();

    let result = Array.from(Array(70)).map((_) => {
        return {
            ten_phuong_xa: faker.lorem.words(2),
            ma_quan_huyen:
            quanHuyen[Math.floor(Math.random() * quanHuyen.length)]
                .ma_quan_huyen,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_quan_huyen == item.ma_quan_huyen &&
                    e.ten_phuong_xa == e.ten_phuong_xa
            ) == pos
        );
    });

    await prisma.phuong_xa.createMany({data: result});
};