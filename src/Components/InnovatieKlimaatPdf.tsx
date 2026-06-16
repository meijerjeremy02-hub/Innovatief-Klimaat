import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// Exact jouw data overgenomen
const dims = [
  { id: 1,  label: 'Vrijheid' },
  { id: 2,  label: 'Ideesupport' },
  { id: 3,  label: 'Vertrouwen & openheid' },
  { id: 4,  label: 'Dynamiek & levendigheid' },
  { id: 5,  label: 'Speelsheid & humor' },
  { id: 6,  label: 'Dialoog' },
  { id: 7,  label: 'Risico nemen' },
  { id: 8,  label: 'Tijd voor ideeën' },
  { id: 9,  label: 'Conflict' },
  { id: 10, label: 'Uitdaging' },
];

// Exact jouw kleurlogica
const scoreColor = (score: number) => {
  if (score <= 6)  return '#ef4444';
  if (score <= 11) return '#f97316';
  if (score <= 16) return '#1e9ba2';
  return '#22c55e';
};

// Styling specifiek voor PDF-bestanden (flexbox werkt hier iets anders dan in Tailwind)
const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#f8fafc', fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottomWidth: 2, borderColor: '#1E254C', paddingBottom: 10 },
  title: { fontSize: 22, color: '#1E254C', fontWeight: 'bold' },
  subtitle: { fontSize: 11, color: '#64748b', marginTop: 5 },
  
  // Tabel styling
table: {
  width: '100%', // Gebruik '100%' in plaats van 'auto' voor een strakke uitlijning
  marginTop: 20,
  borderRadius: 6,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#e2e8f0',
},
  tableRow: { flexDirection: 'row' },
  tableColHeader: { width: '25%', backgroundColor: '#7B77A8', padding: 8 },
  tableCol: { width: '25%', padding: 8, borderBottomWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#ffffff' },
  tableColEven: { width: '25%', padding: 8, borderBottomWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#f1f5f9' },
  
  headerText: { color: 'white', fontWeight: 'bold', fontSize: 10 },
  cellText: { fontSize: 10, color: '#1E254C' },
  scoreText: { fontSize: 10, fontWeight: 'bold' }
});

// De TypeScript interface voor de data die we naar binnen sturen
interface PdfProps {
  personal: number[];
  team: number[];
  college: number[];
}

export default function InnovatieKlimaatPdf({ personal, team, college }: PdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Innovatieklimaat Rapportage</Text>
          <Text style={styles.subtitle}>Overzicht van de 10 dimensies van een innovatief klimaat</Text>
        </View>

        <View style={styles.table}>
          {/* Tabel Kopteksten */}
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, { width: '40%' }]}><Text style={styles.headerText}>Dimensie</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.headerText}>Persoonlijk</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.headerText}>Team gemiddelde</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.headerText}>College-wijd</Text></View>
          </View>

          {/* Tabel Rijen (Dynamisch gevuld met jouw scores) */}
          {dims.map((dim, i) => {
            const isEven = i % 2 === 1;
            const currentColumnStyle = isEven ? styles.tableColEven : styles.tableCol;
            
            return (
              <View style={styles.tableRow} key={dim.id}>
                <View style={[currentColumnStyle, { width: '40%' }]}>
                  <Text style={styles.cellText}>{dim.id}. {dim.label}</Text>
                </View>
                <View style={currentColumnStyle}>
                  <Text style={[styles.scoreText, { color: scoreColor(personal[i]) }]}>{personal[i]} /25</Text>
                </View>
                <View style={currentColumnStyle}>
                  <Text style={[styles.scoreText, { color: scoreColor(team[i]) }]}>{team[i]} /25</Text>
                </View>
                <View style={currentColumnStyle}>
                  <Text style={[styles.scoreText, { color: scoreColor(college[i]) }]}>{college[i]} /25</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}