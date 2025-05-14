import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      text: 'What is E=mc^2', 
      type: 'multiple-choice',
      points: 10, 
      answers: ['Energy equation', 'Mass-energy equivalence', 'Speed of light', 'Gravity equation'],
      correctAnswer: 1
    }
  ]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [tempQuestion, setTempQuestion] = useState({
    text: '',
    type: 'multiple-choice',
    points: '10',
    answers: ['', '', '', ''],
    correctAnswer: 0
  });
  const handleAddQuestion = () => {
    const newId = Math.max(...questions.map(q => q.id), 0) + 1;
    setEditingQuestion(newId);
    setTempQuestion({
      text: '',
      type: 'multiple-choice',
      points: '10',
      answers: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const handleEdit = (question) => {
    setEditingQuestion(question.id);
    setTempQuestion({
      text: question.text,
      type: question.type,
      points: question.points.toString(),
      answers: [...question.answers],
      correctAnswer: question.correctAnswer
    });
  };

  const handleSave = () => {
    if (editingQuestion) {
      const updatedQuestions = questions.map((q) =>
        q.id === editingQuestion
          ? {
              ...q,
              text: tempQuestion.text,
              type: tempQuestion.type,
              points: parseInt(tempQuestion.points) || 0,
              answers: tempQuestion.answers,
              correctAnswer: tempQuestion.correctAnswer
            }
          : q
      );
      if (!updatedQuestions.find(q => q.id === editingQuestion)) {
        // This is a new question
        updatedQuestions.push({
          id: editingQuestion,
          text: tempQuestion.text,
          type: tempQuestion.type,
          points: parseInt(tempQuestion.points) || 0,
          answers: tempQuestion.answers,
          correctAnswer: tempQuestion.correctAnswer
        });
      }
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
    }
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg_img2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Questions</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
            <Text style={styles.addButtonText}>+ Add Question</Text>
          </TouchableOpacity>
        </View>

        {/* Questions List */}
        {!editingQuestion && questions.map((question, index) => (
          <View key={question.id} style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>Question {index + 1}</Text>
              <Text style={styles.questionPoints}>{question.points} points</Text>
            </View>
            <Text style={styles.questionText}>{question.text}</Text>
            <View style={styles.answersList}>
              {question.answers.map((answer, idx) => (
                <View key={idx} style={styles.answerItem}>
                  <Text style={[
                    styles.answerText,
                    idx === question.correctAnswer && styles.correctAnswer
                  ]}>
                    {String.fromCharCode(65 + idx)}. {answer}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.questionActions}>
              <TouchableOpacity onPress={() => handleEdit(question)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(question.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Question Editor */}
        {editingQuestion && (
          <View style={styles.editorContainer}>
            <Text style={styles.sectionTitle}>Question Text:</Text>
            <TextInput
              style={styles.questionInput}
              value={tempQuestion.text}
              onChangeText={(text) => setTempQuestion({ ...tempQuestion, text })}
              multiline
              placeholder="Enter your question here"
            />

            <Text style={styles.sectionTitle}>Type:</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  tempQuestion.type === 'multiple-choice' && styles.selectedType
                ]}
                onPress={() => setTempQuestion({ ...tempQuestion, type: 'multiple-choice' })}
              >
                <Text style={styles.typeButtonText}>Multiple Choice</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  tempQuestion.type === 'true-false' && styles.selectedType
                ]}
                onPress={() => setTempQuestion({ 
                  ...tempQuestion, 
                  type: 'true-false',
                  answers: ['True', 'False']
                })}
              >
                <Text style={styles.typeButtonText}>True/False</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Answers:</Text>
            {tempQuestion.type === 'multiple-choice' && ['A', 'B', 'C', 'D'].map((letter, index) => (
              <View key={letter} style={styles.answerContainer}>
                <TouchableOpacity
                  style={[
                    styles.correctAnswerButton,
                    tempQuestion.correctAnswer === index && styles.selectedAnswer
                  ]}
                  onPress={() => setTempQuestion({ ...tempQuestion, correctAnswer: index })}
                >
                  <Text style={styles.answerLabel}>{letter}</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.answerInput}
                  value={tempQuestion.answers[index]}
                  onChangeText={(text) => {
                    const newAnswers = [...tempQuestion.answers];
                    newAnswers[index] = text;
                    setTempQuestion({ ...tempQuestion, answers: newAnswers });
                  }}
                  placeholder={`Answer ${letter}`}
                />
              </View>
            ))}

            {tempQuestion.type === 'true-false' && (
              <View style={styles.trueFalseContainer}>
                {['True', 'False'].map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.trueFalseOption,
                      tempQuestion.correctAnswer === index && styles.selectedAnswer
                    ]}
                    onPress={() => setTempQuestion({ ...tempQuestion, correctAnswer: index })}
                  >
                    <Text style={styles.trueFalseText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.sectionTitle}>Points:</Text>
            <TextInput
              style={styles.pointsInput}
              value={tempQuestion.points}
              onChangeText={(points) => setTempQuestion({ ...tempQuestion, points })}
              keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditingQuestion(null)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3e1b0f',
  },
  addButton: {
    backgroundColor: '#c2641c',
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeTab: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#c2641c',
  },
  tabText: {
    color: '#333',
  },
  activeTabText: {
    color: 'white',
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  questionNumber: {
    fontWeight: 'bold',
    color: '#3e1b0f',
  },
  questionPoints: {
    color: '#c2641c',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  answersList: {
    marginLeft: 10,
  },
  answerItem: {
    marginBottom: 5,
  },
  answerText: {
    color: '#555',
  },
  correctAnswer: {
    color: '#c2641c',
    fontWeight: 'bold',
  },
  questionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    color: '#c2641c',
    marginRight: 15,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  editorContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3e1b0f',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedType: {
    backgroundColor: '#c2641c',
  },
  typeButtonText: {
    color: '#333',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  correctAnswerButton: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: '#c2641c',
  },
  answerLabel: {
    color: '#3e1b0f',
    fontWeight: 'bold',
  },
  answerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  trueFalseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  trueFalseOption: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: '45%',
    alignItems: 'center',
  },
  trueFalseText: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#c2641c',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  pointsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
});

export default AdminPanel;