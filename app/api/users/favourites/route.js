export  async function GET(){
    try {
        clg("gfd");
        const reqBody = await request.json();
        console.log("favourites backend",reqBody);
    } catch (error) {
        console.log("Error in getting favourite coins");
        console.log(error);
    }
}