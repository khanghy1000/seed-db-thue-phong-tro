import {faker} from "@faker-js/faker";
import {prisma} from "../seed";

export const seedDichVu = async () => {
    let result = Array.from(Array(300)).map((_) => {
        return {
            ten_dich_vu: faker.lorem.words(2),
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex((e) => e.ten_dich_vu == item.ten_dich_vu) == pos
        );
    });

    await prisma.dich_vu.createMany({data: result});
};