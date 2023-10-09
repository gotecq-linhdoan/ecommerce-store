const URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;

const getOrders = async (userId?: string): Promise<any[]> => {
    // const res = await fetch(`${URL}?user_id=${userId}`);
    const res = await fetch(URL);

    return res.json();
};

export default getOrders;
