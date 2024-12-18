-- CreateEnum
CREATE TYPE "MachineType" AS ENUM ('Pump', 'Fan');

-- CreateEnum
CREATE TYPE "SensorModel" AS ENUM ('TcAg', 'TcAs', 'HF_plus');

-- CreateTable
CREATE TABLE "Machine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MachineType" NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitoringPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "machineId" INTEGER NOT NULL,

    CONSTRAINT "MonitoringPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "model" "SensorModel" NOT NULL,
    "monitoringPointId" INTEGER NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonitoringPoint" ADD CONSTRAINT "MonitoringPoint_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_monitoringPointId_fkey" FOREIGN KEY ("monitoringPointId") REFERENCES "MonitoringPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
