import { FieldPacket } from "mysql2";
import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public lat: number;
  public lon: number;

  constructor(obj: NewAdEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Nazwa musi zawierać przynajmniej jeden znak. Maksymalnie 100 znaków."
      );
    }

    if (!obj.description || obj.description.length > 1000) {
      throw new ValidationError(
        "Opis musi zawierać przynajmniej jeden znak. Maksymalnie 1000 znaków."
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Cena nie może być mniejsza niż 0 lub większa niż 9 999 999."
      );
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("Nie można zlokalizować ogłoszenia.");
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOne(id: string): Promise<AdRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `id` = :id",
      {
        id,
      }
    )) as AdRecordResults;

    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
      {
        search: `%${name}%`,
      }
    )) as AdRecordResults;

    return results.map((el) => ({
      id: el.id,
      lat: el.lat,
      lon: el.lon,
    }));
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error("Cannot insert something that is already inserted!");
    }

    await pool.execute(
      "INSERT INTO `ads`(`id`, `name`, `description`, `price`, `lat`, `lon`) VALUES(:id, :name, :description, :price,  :lat, :lon)",
      this
    );
  }
}
