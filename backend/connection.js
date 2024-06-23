import mongoose from "mongoose" 

export async function connection(url,clientoptions){
    await mongoose.connect(url,clientoptions)
    await mongoose.connection.db.admin().command({ ping: 1 });

}
export default connection;
