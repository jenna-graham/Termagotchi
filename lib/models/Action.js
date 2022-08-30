const pool = require('../utils/pool');

module.exports = class Action {
  id;
  prompt;
  happy_choice;
  neglect_choice;
  happy_path_id;
  neglect_path_id;
  is_good;

  constructor(row) {
    this.id = row.id;
    this.prompt = row.prompt;
    this.happy_choice = row.happy_choice;
    this.neglect_choice = row.neglect_choice;
    this.happy_path_id = row.happy_path_id;
    this.neglect_path_id = row.neglect_path_id;
    this.is_good = row.is_good;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM actions
            WHERE id=$1
            `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Action(rows[0]);
  }
};
