import { extname } from "path"
import * as moment from "moment"
import { diskStorage } from "multer"

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split(".")[0]
    const fileExtName = extname(file.originalname)
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("")
    const timestamp = moment().format("YYYY-MM-DD H:m:s")
    callback(null, `${timestamp}${name}-${randomName}${fileExtName}`)
}

export const getDestination = (req, file, cb) => {
    // const date = moment().format("YYYY-MM-DD")
    cb(null, `./public/call-record`)
}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|PDF|xlsx|XLSX|)$/)) {
        return callback(new Error("Only jpg|jpeg|png|gif|pdf|xlsx files are allowed!"), false)
    }

    if (file.size > 15000) {
        return callback(new Error("Size should be less than 15 KB"), false)
    }
    callback(null, true)
}
export const whatsappImageFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        return callback(new Error("Only jpg|jpeg|png|gif|pdf|xlsx files are allowed!"), false)
    }

    if (file.size > 15000) {
        return callback(new Error("Size should be less than 15 KB"), false)
    }
    callback(null, true)
}
export const imageFileStorage = (req, file, callback) => {
    if (file.fieldname === "profile_picture") {
        return callback(null, "./public/users/pictures")
    } else if (file.fieldname === "performa_invoice") {
        return callback(null, "./public/orders/performa")
    } else if (file.fieldname.includes("proposal_attachments") || file.fieldname.includes("attachments")) {
        return callback(null, "./public/proposals")
    } else if (file.fieldname === "upload_document" || file.fieldname === "order_upload_documents") {
        return callback(null, "./public/orders/payments")
    } else if (file.fieldname.includes("payment_receipts") || file.fieldname.includes("payment_receipt")) {
        return callback(null, "./public/orders/payments")
    } else if (file.fieldname === "order_performa_invoice" || file.fieldname === "performa_invoice") {
        return callback(null, "./public/orders/performa")
    } else {
        return callback(new Error("Invalid uploaded filename"))
    }
}

/**** Skip empty rows from csv data ****** */
export const filterEmptyValues = (data, column1, column2) => {
    return data.filter((row) => row[column1] || row[column2])
}

//whatsapp file upload
export const whatsappFile = {
    fileFilter: async () => { },
    storage: diskStorage({
        destination: "./public/whatsapp/media",
        filename(req, file, callback) {
            console.log(file)
        }
    })
}
/** Replace */