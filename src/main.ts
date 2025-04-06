import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from "express"
import { join } from "path"


async function bootstrap() {
  console.log(`avesh our port is running ${process.env.PORT}`);
  const app = await NestFactory.create(AppModule);
  // ✅ Enable CORS globally
  app.enableCors(true);
  app.setGlobalPrefix("/v1/api", { exclude: ["public/*"] })
  app.use("/public", express.static(join(__dirname, "..", "public")))

  // ✅ Enable & configure body-parser
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  await app.listen(`${process.env.PORT}`);


}
bootstrap();
/**
 * 
 * 
import { NestApplication, NestFactory } from "@nestjs/core"
import * as path from "path"
import * as fs from "fs"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common"
import * as express from "express"
import { join } from "path"
// import { LoggerService } from "./logger/logger.service"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import * as compression from "compression"
import * as bodyParser from "body-parser"
import { AllExceptionsFilter } from "./exceptions/exceptions-filter"

// ** Cluster
// import * as cluster from "node:cluster"
// import * as os from "node:os"

// async function clusterSetup(app: INestApplication, PORT: number, maxNumberOfCpusToFork: number) {
//   if (cluster["isPrimary"] && maxNumberOfCpusToFork > 0) {
//     const numCPUs = os.cpus().length
//     for (let i = 0; i < Math.min(numCPUs, maxNumberOfCpusToFork); i++) {
//       cluster["fork"]()
//     }

//     cluster["on"]("exit", (worker, code, signal) => {
//       console.log(`Worker ${worker.process.pid} died`)
//       cluster["fork"]()
//     })
//   } else {
//     await app.listen(PORT, () => {
//       Logger.log(`Application running on PORT: ${PORT}`)
//     })
//   }
// }

async function bootstrap() {
  // const isSSL = process.env.SSL === "true"

  // let httpsOptions = null
  // if (isSSL) {
  //   const keyPath = process.env.SSL_KEY_PATH || ""
  //   const certPath = process.env.SSL_CERT_PATH || ""
  //   const caPath = process.env.SSL_CA_PATH || ""
  //   console.log(path.join(__dirname, "..", caPath))
  //   httpsOptions = {
  //     ca: fs.readFileSync(path.join(__dirname, caPath)),
  //     key: fs.readFileSync(path.join(__dirname, keyPath)),
  //     cert: fs.readFileSync(path.join(__dirname, certPath))
  //   }
  // }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // httpsOptions
    // logger: logger
  })

app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))
const configService = app.get(ConfigService)

const PORT = configService.get<string>("PORT")
const CORS = configService.get<string>("CORS")
const corsArr = CORS ? CORS.split(",") : []
const origin = ["http://localhost:3001", ...corsArr]
console.log(origin)

// app.enableCors({
//   origin,
//   credentials: true,
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Origin",
//     "user-agent",
//     "browser-name",
//     "device-type",
//     "geolocation-lat",
//     "geolocation-lng",
//     "os-detail",
//     "browser-detail",
//     "device-detail"
//   ]
// })

// app.useLogger(app.get(LoggerService))
app.setGlobalPrefix("/v1/api", { exclude: ["public/*", "media/*"] })
app.useGlobalFilters(new AllExceptionsFilter())
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

const config = new DocumentBuilder()
  .setTitle("WHSuites CRM")
  .addBearerAuth()
  .setDescription("The Ishvi Infotech API documentation")
  .setVersion("v1")
  .build()
const document = SwaggerModule.createDocument(app, config)

SwaggerModule.setup("/v1/api", app, document, {
  swaggerOptions: {
    tagsSorter: "alpha",
    operationsSorter: "alpha"
  },
  customSiteTitle: "Ishvi Infotech API (v1) Documentation"
})

// app.use("/public", express.static(join(__dirname, "..", "public")))
app.use("/media", express.static(join(__dirname, "..", "media")))
app.use(compression())

  // clusterSetup(app, Number(PORT), Number(configService.get("ALLOWED_CPUS")))
}

bootstrap()   

 * 
 */