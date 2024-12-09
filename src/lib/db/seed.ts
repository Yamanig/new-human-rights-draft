import { db, migrationClient, checkConnection } from './index';
import { users, stakeholders, reports, evidence, unReviewQuestions } from './schema';
import { eq } from 'drizzle-orm';

async function seed() {
  try {
    // Check connection first
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Unable to establish database connection');
    }

    // Create admin user
    const [adminUser] = await db.insert(users).values({
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'hashed_password_here', // In production, use proper password hashing
      role: 'admin',
    }).returning();

    console.log('Created admin user:', adminUser);

    // Create stakeholders
    const [investigator] = await db.insert(stakeholders).values({
      userId: adminUser.id,
      role: 'level1',
      area: 'Field Operations',
      department: 'Investigation Unit',
      active: true,
    }).returning();

    console.log('Created stakeholder:', investigator);

    // Create sample report
    const [report] = await db.insert(reports).values({
      title: 'Human Rights Violation in Mining Community',
      description: 'Reports of unsafe working conditions and child labor in local mining operations.',
      location: 'Copper Valley, Region A',
      incidentDate: new Date('2024-02-15'),
      status: 'open',
      assignedTo: investigator.id,
      createdBy: adminUser.id,
    }).returning();

    console.log('Created report:', report);

    // Add evidence
    const [evidenceRecord] = await db.insert(evidence).values({
      reportId: report.id,
      type: 'image',
      url: 'https://example.com/evidence1.jpg',
      name: 'site-conditions.jpg',
      uploadedBy: adminUser.id,
    }).returning();

    console.log('Created evidence:', evidenceRecord);

    // Add UN review question
    const [question] = await db.insert(unReviewQuestions).values({
      reportId: report.id,
      question: 'What immediate actions have been taken to address the child labor allegations?',
      status: 'pending',
      assignedTo: investigator.id,
      dueDate: new Date('2024-03-01'),
    }).returning();

    console.log('Created UN review question:', question);

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

seed();