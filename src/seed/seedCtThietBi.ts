import {prisma} from "../seed";

export const seedCtThietBi = async () => {
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

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_phong == item.ma_phong &&
                    e.ma_thiet_bi == item.ma_thiet_bi
            ) == pos
        );
    });

    await prisma.ct_thiet_bi.createMany({
        data: result,
    });
};