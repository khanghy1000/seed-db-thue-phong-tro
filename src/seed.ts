import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import type { ct_dich_vu, ct_thiet_bi } from '@prisma/client';

const prisma = new PrismaClient();

const seedNguoiTimPhong = async () => {
    const result = Array.from(Array(50)).map((_) => {
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
        };
    });

    await prisma.nguoi_tim_phong.createMany({ data: result });
};

const seedChuPhong = async () => {
    const result = Array.from(Array(10)).map((_) => {
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
        };
    });

    await prisma.chu_phong.createMany({ data: result });
};

const seedTinh = async () => {
    const result = Array.from(Array(10)).map((_) => {
        return {
            ten_tinh: faker.location.state(),
        };
    });

    await prisma.tinh.createMany({ data: result });
};

const seedQuanHuyen = async () => {
    const tinh = await prisma.tinh.findMany();

    const result = Array.from(Array(30)).map((_) => {
        return {
            ten_quan_huyen: faker.location.city(),
            ma_tinh: tinh[Math.floor(Math.random() * tinh.length)].ma_tinh,
        };
    });

    await prisma.quan_huyen.createMany({ data: result });
};

const seedPhuongXa = async () => {
    const quanHuyen = await prisma.quan_huyen.findMany();

    const result = Array.from(Array(70)).map((_) => {
        return {
            ten_phuong_xa: faker.lorem.words(2),
            ma_quan_huyen:
                quanHuyen[Math.floor(Math.random() * quanHuyen.length)]
                    .ma_quan_huyen,
        };
    });

    await prisma.phuong_xa.createMany({ data: result });
};

const seedPhong = async () => {
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
            ma_chu_phong:
                chuPhong[Math.floor(Math.random() * chuPhong.length)]
                    .ma_chu_phong,
        };
    });

    await prisma.phong.createMany({ data: result });
};

const seedDichVu = async () => {
    const result = Array.from(Array(300)).map((_) => {
        return {
            ten_dich_vu: faker.lorem.words(2),
        };
    });

    await prisma.dich_vu.createMany({ data: result });
};

const seedCtDichVu = async () => {
    let phong = await prisma.phong.findMany();
    let dichVu = await prisma.dich_vu.findMany();

    let result = Array.from(Array(300)).map((_) => {
        return {
            gia: Math.floor(Math.random() * 1_000_000) + 10_000,
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            ma_dich_vu:
                dichVu[Math.floor(Math.random() * dichVu.length)].ma_dich_vu,
        };
    });

    let insertedPK: string[] = [];

    result = result.filter((item) => {
        const inserted = insertedPK.includes(
            `${item.ma_phong}, ${item.ma_dich_vu}`
        );
        if (!inserted) insertedPK.push(`${item.ma_phong}, ${item.ma_dich_vu}`);

        return !inserted;
    });

    await prisma.ct_dich_vu.createMany({
        data: result,
    });
};

const seedThietBi = async () => {
    Array.from(Array(300)).forEach(async (_) => {
        await prisma.thiet_bi.create({
            data: {
                ten_thiet_bi: faker.lorem.words(2),
            },
        });
    });
};

const seedCtThietBi = async () => {
    let phong = await prisma.phong.findMany();
    let thietBi = await prisma.thiet_bi.findMany();

    let result = Array.from(Array(300)).map((_) => {
        return {
            ma_thiet_bi:
                thietBi[Math.floor(Math.random() * thietBi.length)].ma_thiet_bi,
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            so_luong: Math.floor(Math.random() * 10) + 1,
        };
    });

    let insertedPK: string[] = [];

    result = result.filter((item) => {
        const inserted = insertedPK.includes(
            `${item.ma_phong}, ${item.ma_thiet_bi}`
        );
        if (!inserted) insertedPK.push(`${item.ma_phong}, ${item.ma_thiet_bi}`);
        
        return !inserted;
    });
    await prisma.ct_thiet_bi.createMany({
        data: result.filter((item) => item != null) as ct_thiet_bi[],
    });
};

const seedYeuCauXem = async () => {
    const phong = await prisma.phong.findMany();
    const nguoiTimPhong = await prisma.nguoi_tim_phong.findMany();

    const result = Array.from(Array(100)).map((_) => {
        return {
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            ma_nguoi_tim_phong:
                nguoiTimPhong[Math.floor(Math.random() * nguoiTimPhong.length)]
                    .ma_nguoi_tim_phong,
            ngay_gio_yeu_cau: faker.date.recent(),
            ngay_gio_hen: faker.date.soon(),
            trang_thai: ['Chờ duyệt', 'Đồng ý', 'Từ chối'][
                Math.floor(Math.random() * 3)
            ],
        };
    });

    await prisma.yeu_cau_xem_phong.createMany({ data: result });
};

const seedCtThuePhong = async () => {
    const phong = await prisma.phong.findMany();
    const nguoiTimPhong = await prisma.nguoi_tim_phong.findMany();

    const result = Array.from(Array(100)).map((_) => {
        return {
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            ma_nguoi_tim_phong:
                nguoiTimPhong[Math.floor(Math.random() * nguoiTimPhong.length)]
                    .ma_nguoi_tim_phong,
            ngay_gio_yeu_cau: faker.date.recent(),
            trang_thai: ['Chờ duyệt', 'Đồng ý', 'Từ chối'][
                Math.floor(Math.random() * 3)
            ],
        };
    });

    await prisma.ct_thue_phong.createMany({
        data: result,
    });
};

const seed = async () => {
    await prisma.ct_thue_phong.deleteMany();
    await prisma.yeu_cau_xem_phong.deleteMany();
    await prisma.ct_thiet_bi.deleteMany();
    await prisma.thiet_bi.deleteMany();
    await prisma.ct_dich_vu.deleteMany();
    await prisma.dich_vu.deleteMany();
    await prisma.phong.deleteMany();
    await prisma.phuong_xa.deleteMany();
    await prisma.quan_huyen.deleteMany();
    await prisma.tinh.deleteMany();
    await prisma.chu_phong.deleteMany();
    await prisma.nguoi_tim_phong.deleteMany();

    await seedTinh();
    await seedChuPhong();
    await seedNguoiTimPhong();
    await seedQuanHuyen();
    await seedPhuongXa();
    await seedPhong();
    await seedDichVu();
    await seedCtDichVu();
    await seedThietBi();
    await seedCtThietBi();
    await seedYeuCauXem();
    await seedCtThuePhong();
};

seed().then(() => {
    console.log('Done');
});
