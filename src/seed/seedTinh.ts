import {faker} from "@faker-js/faker";
import {prisma} from "../seed";

export const seedTinh = async () => {
    let result = Array.from(Array(10)).map((_) => {
        return {
            ten_tinh: faker.location.state(),
        };
    });

    result = result.filter((item, pos) => {
        return result.findIndex((e) => e.ten_tinh == item.ten_tinh) == pos;
    });

    await prisma.tinh.createMany({data: result});
};
