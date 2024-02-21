import { faker } from '@faker-js/faker';
import { prisma } from '../seed';

export const seedChuTro = async () => {
    let roleChuTro = (await prisma.role.findFirst({
        where: {
            ten_role: 'CHU_TRO',
        },
    })) as { ma_role: number; ten_role: string };

    let result = Array.from(Array(10)).map((_) => {
        return {
            ho_dem: faker.person.lastName(),
            ten: faker.person.firstName(),
            so_can_cuoc: faker.number.int({
                min: 10 ^ 11,
                max: 999_999_999_999,
            }),
            gioi_tinh: ['Nam', 'Nữ', 'Khác'][Math.floor(Math.random() * 3)],
            ngay_sinh: faker.date.birthdate(),
            email: faker.internet.email(),
            so_dien_thoai: faker.number.int({
                min: 10 ^ 9,
                max: 9_999_999_999,
            }),
            username: faker.internet.userName(),
            password: '123456',
            ma_role: roleChuTro.ma_role,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.so_can_cuoc == item.so_can_cuoc &&
                    e.username == item.username
            ) == pos
        );
    });

    const resultUsername = result.map(({ username, password, ma_role }) => ({
        username,
        password,
        ma_role,
    }));
    const resultChuPhong = result.map(
        ({ password, ma_role, ...remain }) => remain
    );

    await prisma.dang_nhap.createMany({ data: resultUsername });
    await prisma.chu_tro.createMany({ data: resultChuPhong });
};
