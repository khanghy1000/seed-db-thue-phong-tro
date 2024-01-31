import {faker} from "@faker-js/faker";
import {prisma} from "../seed";

export const seedCtThuePhong = async () => {
    const phong = await prisma.phong.findMany();
    const nguoiTimPhong = await prisma.nguoi_tim_phong.findMany();

    let result = Array.from(Array(100)).map((_) => {
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

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_nguoi_tim_phong == item.ma_nguoi_tim_phong &&
                    e.ma_phong == item.ma_phong &&
                    e.ngay_gio_yeu_cau == item.ngay_gio_yeu_cau
            ) == pos
        );
    });

    result = result.filter((item, pos) => {
        if (item.trang_thai != 'Đồng ý') return true;

        return result.findIndex((e) => e.ma_phong == item.ma_phong) == pos;
    });

    await prisma.ct_thue_phong.createMany({
        data: result,
    });
};