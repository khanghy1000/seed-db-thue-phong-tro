import { PrismaClient } from '@prisma/client';
import { seedNguoiTimPhong } from './seed/seedNguoiTimPhong';
import { seedChuTro } from './seed/seedChuTro';
import { seedTinh } from './seed/seedTinh';
import { seedQuanHuyen } from './seed/seedQuanHuyen';
import { seedPhuongXa } from './seed/seedPhuongXa';
import { seedPhong } from './seed/seedPhong';
import { seedDichVu } from './seed/seedDichVu';
import { seedCtDichVu } from './seed/seedCtDichVu';
import { seedThietBi } from './seed/seedThietBi';
import { seedCtThietBi } from './seed/seedCtThietBi';
import { seedYeuCauXem } from './seed/seedYeuCauXem';
import { seedCtThuePhong } from './seed/seedCtThuePhong';

export const prisma = new PrismaClient();

const seed = async () => {
    await prisma.ct_thue_phong.deleteMany();
    await prisma.ct_xem_phong.deleteMany();
    await prisma.ct_thiet_bi.deleteMany();
    await prisma.thiet_bi.deleteMany();
    await prisma.ct_dich_vu.deleteMany();
    await prisma.dich_vu.deleteMany();
    await prisma.phong.deleteMany();
    await prisma.phuong_xa.deleteMany();
    await prisma.quan_huyen.deleteMany();
    await prisma.tinh.deleteMany();
    await prisma.chu_tro.deleteMany();
    await prisma.nguoi_tim_phong.deleteMany();
    await prisma.dang_nhap.deleteMany();

    await seedTinh();
    await seedChuTro();
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

seed()
    .then(() => {
        console.log('Done');
    })
