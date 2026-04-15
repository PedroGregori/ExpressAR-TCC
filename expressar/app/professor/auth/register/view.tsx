import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import useRegisterModel from './model'
import { icons } from '@/assets/images'

export default function RegisterView({
  nome,
  email,
  escola,
  senha,
  confirmarSenha,
  loading,
  erro,
  handleNome,
  handleEmail,
  handleEscola,
  handleSenha,
  handleConfirmarSenha,
  handleCadastro,
  handleGoogleLogin,
}: ReturnType<typeof useRegisterModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4B544" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨</Text>
          </View>

          <Text style={styles.title}>Cadastro</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#B8B8B8"
          value={nome}
          onChangeText={handleNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="#B8B8B8"
          value={email}
          onChangeText={handleEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Escola</Text>
        <TextInput
          style={styles.input}
          placeholder="Escola Municipal Da Cidade"
          placeholderTextColor="#B8B8B8"
          value={escola}
          onChangeText={handleEscola}
        />

        <Text style={styles.label}>Crie sua senha</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#B8B8B8"
            secureTextEntry
            value={senha}
            onChangeText={handleSenha}
          />
          <Text style={styles.eye}>◉</Text>
        </View>

        <Text style={styles.label}>Confirme a senha</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#B8B8B8"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={handleConfirmarSenha}
          />
          <Text style={styles.eye}>◉</Text>
        </View>

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={handleCadastro}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnPrimaryText}>Criar conta</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Ou entre com</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.googleBtn}
          onPress={handleGoogleLogin}
          activeOpacity={0.85}
        >
          <Image source={icons.google} style={styles.googleIcon} />
          <Text style={styles.googleText}>Entre com Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE6',
  },

  header: {
    backgroundColor: '#F4B544',
    paddingTop: hp('4.5%'),
    paddingBottom: hp('2.2%'),
    paddingHorizontal: wp('4%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.2%'),
  },

  avatar: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    backgroundColor: '#F7F3E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3.5%'),
  },

  avatarEmoji: {
    fontSize: wp('8%'),
  },

  title: {
    fontSize: wp('7%'),
    fontWeight: '800',
    color: '#FFFFFF',
  },

  form: {
    paddingHorizontal: wp('4.5%'),
    paddingTop: hp('2.2%'),
  },

  label: {
    fontSize: wp('4.6%'),
    color: '#E4A12D',
    fontWeight: '700',
    marginBottom: hp('0.8%'),
  },

  input: {
    width: '100%',
    height: hp('6.1%'),
    backgroundColor: '#F4F4F4',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.6%'),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    color: '#333',
  },

  passwordBox: {
    width: '100%',
    height: hp('6.1%'),
    backgroundColor: '#F4F4F4',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.6%'),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  passwordInput: {
    flex: 1,
    color: '#333',
  },

  eye: {
    color: '#9E9E9E',
    fontSize: wp('4.2%'),
    marginLeft: wp('2%'),
  },

  btnPrimary: {
    width: '100%',
    height: hp('5.8%'),
    backgroundColor: '#F4B544',
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('0.4%'),
  },

  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: wp('4%'),
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2%'),
    marginBottom: hp('1.8%'),
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CFCFCF',
  },

  orText: {
    marginHorizontal: wp('3%'),
    color: '#9A9A9A',
    fontSize: wp('3.4%'),
  },

  googleBtn: {
    width: '100%',
    height: hp('6%'),
    backgroundColor: '#F8F8F8',
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleIcon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
    marginRight: wp('2.5%'),
  },

  googleText: {
    color: '#333',
    fontSize: wp('3.8%'),
    fontWeight: '500',
  },

  error: {
    color: '#D9534F',
    marginBottom: hp('1%'),
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
})