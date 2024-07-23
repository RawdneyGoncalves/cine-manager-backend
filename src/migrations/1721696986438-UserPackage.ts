import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class UserPackage1721696986438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_package',
            columns: [
                {
                    name: 'userId',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'packageId',
                    type: 'int',
                    isPrimary: true,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('user_package', new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
        }));

        await queryRunner.createForeignKey('user_package', new TableForeignKey({
            columnNames: ['packageId'],
            referencedTableName: 'packages',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user_package');

        if (table) {
            const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.includes('userId'));
            if (foreignKeyUser) {
                await queryRunner.dropForeignKey('user_package', foreignKeyUser);
            }

            const foreignKeyPackage = table.foreignKeys.find(fk => fk.columnNames.includes('packageId'));
            if (foreignKeyPackage) {
                await queryRunner.dropForeignKey('user_package', foreignKeyPackage);
            }

            await queryRunner.dropTable('user_package');
        }
    }
}
