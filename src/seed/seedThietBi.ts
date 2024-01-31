import {faker} from "@faker-js/faker";
import {prisma} from "../seed";

export const seedThietBi = async () => {
    let result = Array.from(Array(300)).map((_) => {
        return {
            ten_thiet_bi: faker.lorem.words(2),
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex((e) => e.ten_thiet_bi == item.ten_thiet_bi) == pos
        );
    });

    await prisma.thiet_bi.createMany({data: result});
};