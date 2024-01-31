import {prisma} from "../seed";

export const seedCtDichVu = async () => {
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

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_dich_vu == item.ma_dich_vu &&
                    e.ma_phong == item.ma_phong
            ) == pos
        );
    });

    await prisma.ct_dich_vu.createMany({
        data: result,
    });
};