import {prisma} from "../seed";
import {faker} from "@faker-js/faker";

export const seedQuanHuyen = async () => {
    const tinh = await prisma.tinh.findMany();

    let result = Array.from(Array(30)).map((_) => {
        return {
            ten_quan_huyen: faker.location.city(),
            ma_tinh: tinh[Math.floor(Math.random() * tinh.length)].ma_tinh,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ten_quan_huyen == item.ten_quan_huyen &&
                    e.ma_tinh == item.ma_tinh
            ) == pos
        );
    });

    await prisma.quan_huyen.createMany({data: result});
};