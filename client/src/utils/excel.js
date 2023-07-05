import { writeFile as writeFileXLSX } from "xlsx";
import { utils } from "xlsx";



const exportFile = (name,data) =>{
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${name}.xlsx`);
};

export { exportFile}