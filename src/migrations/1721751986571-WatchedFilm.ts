import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class WatchedFilm1721751986571 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'watched_film',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'userId',
                        type: 'int',
                    },
                    {
                        name: 'filmId',
                        type: 'int',
                    },
                    {
                        name: 'watchedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'watched_film',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'watched_film',
            new TableForeignKey({
                columnNames: ['filmId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'films',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('watched_film');
        if (table) {
            const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
            const foreignKeyFilm = table.foreignKeys.find(fk => fk.columnNames.indexOf('filmId') !== -1);

            if (foreignKeyUser) {
                await queryRunner.dropForeignKey('watched_film', foreignKeyUser);
            }

            if (foreignKeyFilm) {
                await queryRunner.dropForeignKey('watched_film', foreignKeyFilm);
            }
        }

        await queryRunner.dropTable('watched_film');
    }
}
